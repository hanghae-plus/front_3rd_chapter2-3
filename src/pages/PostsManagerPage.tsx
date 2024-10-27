import FilterOrder from "@/features/filter/ui/FilterOrder";
import FilterSort from "@/features/filter/ui/FilterSort";
import FilterTags from "@/features/filter/ui/FilterTags";
import SearchInput from "@/features/search/ui/SearchInput";
import { highlightText } from "@/shared/lib/utils";
import { Button, Card } from "@/shared/ui";
import Pagination from "@/shared/ui/Pagination";
import { ModalAddComment } from "@/widgets/comment/ui/ModalAddComment";
import ModalEditComment from "@/widgets/comment/ui/ModalEditComment";
import ModalAddPost from "@/widgets/post/ui/ModalAddPost";
import ModalEditPost from "@/widgets/post/ui/ModalEditPost";
import ModalPostDetail from "@/widgets/post/ui/ModalPostDetail";
import TablePosts from "@/widgets/post/ui/TablePosts";
import { User } from "@/widgets/user/api/types";
import ModalUserInfo from "@/widgets/user/ui/ModalUserInfo";
import { Edit2, Plus, ThumbsUp, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export type Comment = {
  body: string;
  id: number;
  likes: number;
  postId: number;
  user: {
    id: number;
    username: string;
    fullName: string;
  };
};

export type Post = {
  id: number;
  body: string;
  title: string;
  userId: number;
  views: number;
  reactions: {
    likes: number;
    dislikes: number;
  };
  tags: string[];
  author?: Pick<User, "id" | "username" | "image">;
};

export type CommentResponse = {
  comments: Comment[];
  total: number;
  skip: number;
  limit: number;
};

export type PostsResponse = {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
};

export type UsersResponse = {
  users: User[];
};

export type NewComment = {
  body: string;
  postId: number | null;
  userId: number;
};

export type NewPost = {
  title: string;
  body: string;
  userId: number;
};

const PostsManager = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 상태 관리
  // post
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [newPost, setNewPost] = useState({ title: "", body: "", userId: 1 });

  // pagination
  const [total, setTotal] = useState(0);

  // filter
  const queryParams = new URLSearchParams(location.search);
  const [skip, setSkip] = useState(parseInt(queryParams.get("skip") || "0"));
  const [limit, setLimit] = useState(parseInt(queryParams.get("limit") || "10"));
  const [searchQuery, setSearchQuery] = useState(queryParams.get("search") || "");
  const [sortOrder, setSortOrder] = useState(queryParams.get("sortOrder") || "asc");
  const [sortBy, setSortBy] = useState(queryParams.get("sortBy") || "");
  const [selectedTag, setSelectedTag] = useState(queryParams.get("tag") || "");

  // dialog
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false);
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false);
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);

  // loading
  const [loading, setLoading] = useState(false);

  // tags
  const [tags, setTags] = useState<{ url: string; slug: string }[]>([]);

  // comments
  const [comments, setComments] = useState<{ [key: number]: Comment[] }>({});
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const [newComment, setNewComment] = useState<NewComment>({ body: "", postId: 0, userId: 1 });

  // user
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

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
  const fetchPosts = () => {
    setLoading(true);
    let postsData: PostsResponse;
    let usersData: Pick<User, "id" | "username" | "image">[];

    fetch(`/api/posts?limit=${limit}&skip=${skip}`)
      .then((response) => response.json())
      .then((data) => {
        postsData = data;

        return fetch("/api/users?limit=0&select=username,image");
      })
      .then((response) => response.json())
      .then((users) => {
        usersData = users.users;
        const postsWithUsers = postsData.posts.map((post) => ({
          ...post,
          author: usersData.find((user) => user.id === post.userId),
        }));

        setPosts(postsWithUsers);
        setTotal(postsData.total);
      })
      .catch((error) => {
        console.error("게시물 가져오기 오류:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // 태그 가져오기
  const fetchTags = async () => {
    try {
      const response = await fetch("/api/posts/tags");
      const data = await response.json();
      setTags(data);
    } catch (error) {
      console.error("태그 가져오기 오류:", error);
    }
  };

  // 게시물 검색
  const searchPosts = async () => {
    if (!searchQuery) {
      fetchPosts();
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`/api/posts/search?q=${searchQuery}`);
      const data = await response.json();
      setPosts(data.posts);
      setTotal(data.total);
    } catch (error) {
      console.error("게시물 검색 오류:", error);
    }
    setLoading(false);
  };

  // 태그별 게시물 가져오기
  const fetchPostsByTag = async (tag: string) => {
    if (!tag || tag === "all") {
      fetchPosts();
      return;
    }
    setLoading(true);
    try {
      const [postsResponse, usersResponse] = await Promise.all([
        fetch(`/api/posts/tag/${tag}`),
        fetch("/api/users?limit=0&select=username,image"),
      ]);
      const postsData = (await postsResponse.json()) as PostsResponse;
      const usersData = (await usersResponse.json()) as UsersResponse;

      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: usersData.users.find((user) => user.id === post.userId),
      }));

      setPosts(postsWithUsers);
      setTotal(postsData.total);
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error);
    }
    setLoading(false);
  };

  // 게시물 추가
  const addPost = async () => {
    try {
      const response = await fetch("/api/posts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });
      const data = await response.json();
      setPosts([data, ...posts]);
      setShowAddDialog(false);
      setNewPost({ title: "", body: "", userId: 1 });
    } catch (error) {
      console.error("게시물 추가 오류:", error);
    }
  };

  // 게시물 업데이트
  const updatePost = async () => {
    try {
      const response = await fetch(`/api/posts/${selectedPost?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedPost),
      });
      const data = await response.json();
      setPosts(posts.map((post) => (post.id === data.id ? data : post)));
      setShowEditDialog(false);
    } catch (error) {
      console.error("게시물 업데이트 오류:", error);
    }
  };

  // 게시물 삭제
  const deletePost = async (id: number) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("게시물 삭제 오류:", error);
    }
  };

  // 댓글 가져오기
  const fetchComments = async (postId: number) => {
    if (comments[postId]) return; // 이미 불러온 댓글이 있으면 다시 불러오지 않음
    try {
      const response = await fetch(`/api/comments/post/${postId}`);
      const data = (await response.json()) as CommentResponse;
      setComments((prev) => ({ ...prev, [postId]: data.comments }));
    } catch (error) {
      console.error("댓글 가져오기 오류:", error);
    }
  };

  // 댓글 추가
  const addComment = async () => {
    try {
      const response = await fetch("/api/comments/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      });
      const data = await response.json();
      setComments((prev) => ({
        ...prev,
        [data.postId]: [...(prev[data.postId] || []), data],
      }));
      setShowAddCommentDialog(false);
      setNewComment({ body: "", postId: null, userId: 1 });
    } catch (error) {
      console.error("댓글 추가 오류:", error);
    }
  };

  // 댓글 업데이트
  const updateComment = async () => {
    try {
      const response = await fetch(`/api/comments/${selectedComment?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: selectedComment?.body }),
      });
      const data = await response.json();
      setComments((prev) => ({
        ...prev,
        [data.postId]: prev[data.postId].map((comment) => (comment.id === data.id ? data : comment)),
      }));
      setShowEditCommentDialog(false);
    } catch (error) {
      console.error("댓글 업데이트 오류:", error);
    }
  };

  // 댓글 삭제
  const deleteComment = async (id: number, postId: number) => {
    try {
      await fetch(`/api/comments/${id}`, {
        method: "DELETE",
      });
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((comment) => comment.id !== id),
      }));
    } catch (error) {
      console.error("댓글 삭제 오류:", error);
    }
  };

  // 댓글 좋아요
  const likeComment = async (id: number, postId: number) => {
    const comment = comments[postId]?.find((c) => c.id === id);
    if (!comment) return;
    try {
      const response = await fetch(`/api/comments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likes: comment.likes + 1 }),
      });
      const data = await response.json();
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].map((comment) => (comment.id === data.id ? data : comment)),
      }));
    } catch (error) {
      console.error("댓글 좋아요 오류:", error);
    }
  };

  // 게시물 상세 보기
  const openPostDetail = (post: Post) => {
    setSelectedPost(post);
    fetchComments(post.id);
    setShowPostDetailDialog(true);
  };

  // 사용자 모달 열기
  const openUserModal = async (user: Pick<User, "id" | "username" | "image"> | undefined) => {
    if (!user) return;
    try {
      const response = await fetch(`/api/users/${user.id}`);
      const userData = await response.json();
      setSelectedUser(userData);
      setShowUserModal(true);
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error);
    }
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

  // 댓글 렌더링
  const renderComments = (postId: number) => (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button
          size="sm"
          onClick={() => {
            setNewComment({ ...newComment, postId });
            setShowAddCommentDialog(true);
          }}
        >
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {comments[postId]?.map((comment) => (
          <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="font-medium truncate">{comment.user.username}:</span>
              <span className="truncate">{highlightText(comment.body, searchQuery)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" onClick={() => likeComment(comment.id, postId)}>
                <ThumbsUp className="w-3 h-3" />
                <span className="ml-1 text-xs">{comment.likes}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedComment(comment);
                  setShowEditCommentDialog(true);
                }}
              >
                <Edit2 className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => deleteComment(comment.id, postId)}>
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Card.Container className="w-full max-w-6xl mx-auto">
      <Card.Header>
        <Card.Title className="flex items-center justify-between">
          <span>게시물 관리자</span>
          {/* 게시물 추가 대화상자 */}
          <ModalAddPost />
        </Card.Title>
      </Card.Header>
      <Card.Content>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <div className="flex gap-4">
            <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchPosts={searchPosts} />
            <FilterTags
              selectedTag={selectedTag}
              setSelectedTag={setSelectedTag}
              fetchPostsByTag={fetchPostsByTag}
              updateURL={updateURL}
              tags={tags}
            />
            <FilterSort sortBy={sortBy} setSortBy={setSortBy} />
            <FilterOrder sortOrder={sortOrder} setSortOrder={setSortOrder} />
          </div>
          {/* 게시물 테이블 */}
          {loading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            // 게시물 테이블 렌더링
            <TablePosts
              posts={posts}
              searchQuery={searchQuery}
              selectedTag={selectedTag}
              setSelectedTag={setSelectedTag}
              updateURL={updateURL}
              openUserModal={openUserModal}
              openPostDetail={openPostDetail}
              setSelectedPost={setSelectedPost}
              setShowEditDialog={setShowEditDialog}
              deletePost={deletePost}
            />
          )}
          {/* 페이지네이션 */}
          <Pagination size={limit} setSize={setLimit} page={skip} setPage={setSkip} total={total} />
        </div>
      </Card.Content>

      {/* 게시물 수정 대화상자 */}
      <ModalEditPost
        showEditDialog={showEditDialog}
        setShowEditDialog={setShowEditDialog}
        selectedPost={selectedPost}
        updatePost={updatePost}
        onChangePost={(key, value) => {
          if (!selectedPost) return;
          setSelectedPost({ ...selectedPost, [key]: value });
        }}
      />

      {/* 댓글 추가 대화상자 */}
      <ModalAddComment
        showAddCommentDialog={showAddCommentDialog}
        setShowAddCommentDialog={setShowAddCommentDialog}
        newComment={newComment}
        addComment={addComment}
        onChangeComment={(e) => setNewComment((prev) => ({ ...prev, body: e.target.value }))}
      />

      {/* 댓글 수정 대화상자 */}
      <ModalEditComment
        showEditCommentDialog={showEditCommentDialog}
        setShowEditCommentDialog={setShowEditCommentDialog}
        selectedComment={selectedComment}
        updateComment={updateComment}
        onChangeComment={(e) => {
          if (!selectedComment) return;
          setSelectedComment({ ...selectedComment, body: e.target.value });
        }}
      />

      {/* 게시물 상세 보기 대화상자 */}
      <ModalPostDetail
        showPostDetailDialog={showPostDetailDialog}
        setShowPostDetailDialog={setShowPostDetailDialog}
        selectedPost={selectedPost}
        searchQuery={searchQuery}
        renderComments={renderComments}
      />

      {/* 사용자 모달 */}
      <ModalUserInfo selectedUser={selectedUser} isOpen={showUserModal} onOpenChange={setShowUserModal} />
    </Card.Container>
  );
};

export default PostsManager;
