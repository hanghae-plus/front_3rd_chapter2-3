import { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { Post, NewPost, NewComment, Comments, Tag, User } from "../temp/types.ts";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Textarea,
  HighlightText,
} from "../shared/ui";
import {
  deleteExistingPost,
  getPosts,
  getPostsByTag,
  getSearchPosts,
  getTags,
  postNewPost,
  putExistingPost,
} from "../entities/post/api";
import {
  deleteExistingComment,
  getComments,
  patchLikeComment,
  postNewComment,
  putExistingComment,
} from "../entities/comment/api";
import { UserModal } from "../feature/user/ui";
import { useUser } from "../feature/user/model";
import { CommentSection } from "../feature/comment/ui/CommentSection.tsx";
import { AddPostDialog, PostTable } from "../feature/post/ui";

// post게시물, comment, user
const PostsManager = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // 상태 관리
  const [posts, setPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [skip, setSkip] = useState<number>(parseInt(queryParams.get("skip") || "0"));
  const [limit, setLimit] = useState<number>(parseInt(queryParams.get("limit") || "10"));
  const [searchQuery, setSearchQuery] = useState<string>(queryParams.get("search") || "");
  const [selectedPost, setSelectedPost] = useState<Post>();
  const [sortBy, setSortBy] = useState<string>(queryParams.get("sortBy") || "");
  const [sortOrder, setSortOrder] = useState<string>(queryParams.get("sortOrder") || "asc");
  const [showAddDialog, setShowAddDialog] = useState<boolean>(false);
  const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
  const [newPost, setNewPost] = useState<NewPost>({ title: "", body: "", userId: 1 });
  const [loading, setLoading] = useState<boolean>(false);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>(queryParams.get("tag") || "");

  //comment
  const [comments, setComments] = useState<Record<number, Comments[]>>([]);
  const [selectedComment, setSelectedComment] = useState<Comments>();
  const [newComment, setNewComment] = useState<NewComment>({ body: "", postId: null, userId: 1 });

  const [showAddCommentDialog, setShowAddCommentDialog] = useState<boolean>(false);
  const [showEditCommentDialog, setShowEditCommentDialog] = useState<boolean>(false);
  const [showPostDetailDialog, setShowPostDetailDialog] = useState<boolean>(false);

  //user
  const { showUserModal, selectedUser, setShowUserModal, openUserModal } = useUser();

  // URL 업데이트 함수
  const updateURL = () => {
    const params = new URLSearchParams();
    if (skip) params.set("skip", skip.toString());
    if (limit) params.set("limit", limit.toString());
    if (searchQuery) params.set("search", searchQuery);
    if (sortBy) params.set("sortBy", sortBy);
    if (sortOrder) params.set("sortOrder", sortOrder);
    if (selectedTag) params.set("tag", selectedTag);
    navigate(`?${params.toString()}`);
  };

  // 게시물 가져오기
  const fetchPosts = async () => {
    setLoading(true);

    const response = await getPosts(limit, skip);

    if (response) {
      const { postsData, usersData } = response;

      const postsWithUsers = postsData.posts.map((post: Post) => ({
        ...post,
        author: usersData.users.find((user: User) => user.id === post.userId),
      }));

      setPosts(postsWithUsers);
      setTotal(postsData.total);
    }

    setLoading(false);
  };

  // 태그 가져오기
  const fetchTags = async () => {
    const data = await getTags();

    if (data) {
      setTags(data);
    }
  };

  // // 게시물 검색
  const searchPosts = async () => {
    if (!searchQuery) {
      await fetchPosts();
      return;
    }

    setLoading(true);

    const data = await getSearchPosts(searchQuery);

    if (data) {
      setPosts(data.posts);
      setTotal(data.total);

      setLoading(false);
    }
  };

  // 태그별 게시물 가져오기
  const fetchPostsByTag = async (tag: string) => {
    if (!tag || tag === "all") {
      await fetchPosts();
      return;
    }

    setLoading(true);

    const data = await getPostsByTag(tag);

    if (data) {
      const { postsData, usersData } = data;

      const postsWithUsers = postsData.posts.map((post: Post) => ({
        ...post,
        author: usersData.users.find((user: User) => user.id === post.userId),
      }));

      setPosts(postsWithUsers);
      setTotal(postsData.total);
    }

    setLoading(false);
  };

  // 게시물 추가
  const addPost = async () => {
    const data = await postNewPost(newPost);

    if (data) {
      setPosts([data, ...posts]);
      setShowAddDialog(false);
      setNewPost({ title: "", body: "", userId: 1 });
    }
  };

  // 게시물 업데이트
  const updatePost = async () => {
    if (selectedPost) {
      const data = await putExistingPost(selectedPost);

      if (data) {
        setPosts(posts.map((post) => (post.id === data.id ? data : post)));
        setShowEditDialog(false);
      }
    }
  };

  // 게시물 삭제
  const deletePost = async (id: number) => {
    await deleteExistingPost(id);

    setPosts(posts.filter((post) => post?.id !== id));
  };

  // 댓글 가져오기
  const fetchComments = async (postId: number) => {
    if (comments[postId]) return; // 이미 불러온 댓글이 있으면 다시 불러오지 않음

    const data = await getComments(postId);
    console.log(data);
    if (data) {
      setComments((prev) => ({ ...prev, [postId]: data.comments }));
    }
  };

  // 댓글 추가
  const addComment = async () => {
    const data = await postNewComment(newComment);

    if (data) {
      setComments((prev) => ({
        ...prev,
        [data.postId]: [...(prev[data?.postId] || []), data],
      }));
      setShowAddCommentDialog(false);
      setNewComment({ body: "", postId: null, userId: 1 });
    }
  };

  // 댓글 업데이트
  const updateComment = async () => {
    if (selectedComment) {
      const data = await putExistingComment(selectedComment.id, selectedComment.body);

      if (data) {
        setComments((prev) => ({
          ...prev,
          [data.postId]: prev[data.postId].map((comment) => (comment.id === data.id ? data : comment)),
        }));
        setShowEditCommentDialog(false);
      }
    }
  };

  // 댓글 삭제
  const deleteComment = async (id: number, postId: number) => {
    await deleteExistingComment(id);

    setComments((prev) => ({
      ...prev,
      [postId]: prev[postId].filter((comment: Comments) => comment.id !== id),
    }));
  };

  // 댓글 좋아요
  const likeComment = async (id: number, postId: number) => {
    const comment = comments[postId]?.find((c) => c.id === id);

    if (!comment) {
      console.error("댓글을 찾을 수 없습니다.");
      return;
    }

    const data = await patchLikeComment(id, comment.likes);
    if (data) {
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].map((comment: Comments) => (comment.id === data.id ? data : comment)),
      }));
    }
  };

  // 게시물 상세 보기
  const openPostDetail = async (post: Post) => {
    setSelectedPost(post);
    await fetchComments(post.id);
    setShowPostDetailDialog(true);
  };

  useEffect(() => {
    fetchTags();
  }, []);

  useEffect(() => {
    if (selectedTag) {
      fetchPostsByTag(selectedTag);
    } else {
      fetchPosts();
    }
    updateURL();
  }, [skip, limit, sortBy, sortOrder, selectedTag]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSkip(parseInt(params.get("skip") || "0"));
    setLimit(parseInt(params.get("limit") || "10"));
    setSearchQuery(params.get("search") || "");
    setSortBy(params.get("sortBy") || "");
    setSortOrder(params.get("sortOrder") || "asc");
    setSelectedTag(params.get("tag") || "");
  }, [location.search]);

  // 게시물 테이블 렌더링

  // 댓글 렌더링

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}

          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="게시물 검색..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && searchPosts()}
                />
              </div>
            </div>
            <Select
              value={selectedTag}
              onValueChange={(value) => {
                setSelectedTag(value);
                fetchPostsByTag(value);
                updateURL();
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="태그 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 태그</SelectItem>
                {tags.map((tag) => (
                  <SelectItem key={tag.url} value={tag.slug}>
                    {tag.slug}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="정렬 기준" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">없음</SelectItem>
                <SelectItem value="id">ID</SelectItem>
                <SelectItem value="title">제목</SelectItem>
                <SelectItem value="reactions">반응</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="정렬 순서" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">오름차순</SelectItem>
                <SelectItem value="desc">내림차순</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 게시물 테이블 */}
          {loading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostTable
              posts={posts}
              searchQuery={searchQuery}
              selectedTag={selectedTag}
              openPostDetail={openPostDetail}
              openUserModal={openUserModal}
              setSelectedPost={setSelectedPost}
              setSelectedTag={setSelectedTag}
              setShowEditDialog={setShowEditDialog}
              updateURL={updateURL}
              deletePost={deletePost}
            />
          )}

          {/* 페이지네이션 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span>표시</span>
              <Select value={limit.toString()} onValueChange={(value) => setLimit(Number(value))}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                </SelectContent>
              </Select>
              <span>항목</span>
            </div>
            <div className="flex gap-2">
              <Button disabled={skip === 0} onClick={() => setSkip(Math.max(0, skip - limit))}>
                이전
              </Button>
              <Button disabled={skip + limit >= total} onClick={() => setSkip(skip + limit)}>
                다음
              </Button>
            </div>
          </div>
        </div>
      </CardContent>

      {/* 게시물 추가 대화상자 */}
      <AddPostDialog
        isOpen={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        setNewPost={setNewPost}
        newPost={newPost}
        addPost={addPost}
      />

      {/* 게시물 수정 대화상자 */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>게시물 수정</DialogTitle>
          </DialogHeader>
          {selectedPost && (
            <div className="space-y-4">
              <Input
                placeholder="제목"
                value={selectedPost.title || ""}
                onChange={(e) => setSelectedPost({ ...selectedPost, title: e.target.value })}
              />
              <Textarea
                rows={15}
                placeholder="내용"
                value={selectedPost.body || ""}
                onChange={(e) => setSelectedPost({ ...selectedPost, body: e.target.value })}
              />
              <Button onClick={updatePost}>게시물 업데이트</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* 댓글 추가 대화상자 */}
      <Dialog open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>새 댓글 추가</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="댓글 내용"
              value={newComment.body}
              onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
            />
            <Button onClick={addComment}>댓글 추가</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 댓글 수정 대화상자 */}
      <Dialog open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>댓글 수정</DialogTitle>
          </DialogHeader>
          {selectedComment && (
            <div className="space-y-4">
              <Textarea
                placeholder="댓글 내용"
                value={selectedComment?.body || ""}
                onChange={(e) => setSelectedComment({ ...selectedComment, body: e.target.value })}
              />
              <Button onClick={updateComment}>댓글 업데이트</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* 게시물 상세 보기 대화상자 */}
      <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
        {selectedPost && (
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{HighlightText(selectedPost.title, searchQuery)}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p>{HighlightText(selectedPost.body, searchQuery)}</p>
              <CommentSection
                postId={selectedPost.id}
                comments={comments}
                setNewComment={setNewComment}
                setSelectedComment={setSelectedComment}
                setShowAddCommentDialog={setShowAddCommentDialog}
                setShowEditCommentDialog={setShowEditCommentDialog}
                searchQuery={searchQuery}
                likeComment={likeComment}
                deleteComment={deleteComment}
              ></CommentSection>
            </div>
          </DialogContent>
        )}
      </Dialog>

      {/* 사용자 모달 */}
      <UserModal user={selectedUser} isOpen={showUserModal} onClose={() => setShowUserModal(false)} />
    </Card>
  );
};

export default PostsManager;
