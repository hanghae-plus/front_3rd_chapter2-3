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
} from "../shared/ui";

import {
  deleteExistingComment,
  getComments,
  patchLikeComment,
  postNewComment,
  putExistingComment,
} from "../entities/comment/api";
import { UserModal } from "../feature/user/ui";
import { useUser } from "../feature/user/model";
import { AddPostDialog, DetailPostDialog, EditPostDialog, PostTable } from "../feature/post/ui";
import { AddCommentDialog, EditCommentDialog } from "../feature/comment/ui";
import { usePostContext } from "../feature/post/model/PostContext.tsx";

// post게시물, comment, user
const PostsManager = () => {
  //comment
  const [comments, setComments] = useState<Record<number, Comments[]>>([]);
  const [selectedComment, setSelectedComment] = useState<Comments>();
  const [newComment, setNewComment] = useState<NewComment>({ body: "", postId: null, userId: 1 });

  const [showAddCommentDialog, setShowAddCommentDialog] = useState<boolean>(false);
  const [showEditCommentDialog, setShowEditCommentDialog] = useState<boolean>(false);

  const {
    posts,
    total,
    loading,
    tags,
    selectedTag,
    selectedPost,
    newPost,
    showAddDialog,
    showEditDialog,
    skip,
    limit,
    searchQuery,
    sortBy,
    sortOrder,
    updateURL,
    searchPosts,
    fetchPostsByTag,
    addPost,
    updatePost,
    deletePost,
    setSkip,
    setLimit,
    setSearchQuery,
    setSortBy,
    setSortOrder,
    setSelectedTag,
    setSelectedPost,
    setNewPost,
    setShowAddDialog,
    setShowEditDialog,
  } = usePostContext();

  //user
  const { showUserModal, selectedUser, setShowUserModal, openUserModal } = useUser();

  const [showPostDetailDialog, setShowPostDetailDialog] = useState<boolean>(false);

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
    setSelectedPost({ ...post });
    await fetchComments(post.id);
    setShowPostDetailDialog(true);
  };

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
      <EditPostDialog
        isOpen={showEditDialog}
        onClose={() => setShowEditDialog(false)}
        selectedPost={selectedTag}
        setSelectedPost={setSelectedPost}
        updatePost={updatePost}
      />

      {/* 댓글 추가 대화상자 */}
      <AddCommentDialog
        isOpen={showAddCommentDialog}
        onClose={() => setShowAddCommentDialog(false)}
        setNewComment={setNewComment}
        newComment={newComment}
        addComment={addComment}
      />

      {/* 댓글 수정 대화상자 */}
      <EditCommentDialog
        isOpen={showEditCommentDialog}
        onClose={() => setShowEditCommentDialog(false)}
        selectedComment={selectedComment}
        setSelectedComment={setSelectedComment}
        updateComment={updateComment}
      />

      {/* 게시물 상세 보기 대화상자 */}
      <DetailPostDialog
        isOpen={showPostDetailDialog}
        onClose={() => setShowPostDetailDialog(false)}
        selectedPost={selectedPost}
        searchQuery={searchQuery}
        comments={comments}
        setNewComment={setNewComment}
        setSelectedComment={setSelectedComment}
        setShowEditCommentDialog={setShowEditCommentDialog}
        setShowAddCommentDialog={setShowAddCommentDialog}
        likeComment={likeComment}
        deleteComment={deleteComment}
      />

      {/* 사용자 모달 */}
      <UserModal user={selectedUser} isOpen={showUserModal} onClose={() => setShowUserModal(false)} />
    </Card>
  );
};

export default PostsManager;
