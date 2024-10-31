import { Edit2, Plus, ThumbsUp, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Loading } from '~/widgets/layout/ui/Loading';
import { Pagination } from '~/widgets/pagination/ui/Pagination';
import { PostTable } from '~/widgets/post-table/ui/PostTable';
import { SearchFilter } from '~/widgets/search-filter/ui/SearchFilter';

import { ModalCombine } from '~/features/modal/ui/ModalCombine';
import { usePost } from '~/features/post/model/usePost';

import { CommentResponseDto } from '~/entities/comment/model/type';
import { useModalStore } from '~/entities/modal/model/modalStore';
import { usePostStore } from '~/entities/post/model/store';
import { PostResponseDto } from '~/entities/post/model/types';

import { Button } from '~/shared/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '~/shared/ui/Card';

const PostsManager = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // 상태 관리
  const [_, setPosts] = useState<any>([]);

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', body: '', userId: 1 });
  const [loading, setLoading] = useState(false);

  const [comments, setComments] = useState<Record<string, CommentResponseDto[]>>({});
  const [selectedComment, setSelectedComment] = useState<CommentResponseDto | null>(null);
  const [newComment, setNewComment] = useState({ body: '', postId: null, userId: 1 });
  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false);
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false);
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false);

  const [searchQuery, setSearchQuery] = useState(queryParams.get('search') || '');
  const [sp, setSelectedPost] = useState<PostResponseDto | null>(null);

  const [selectedTag, setSelectedTag] = useState(queryParams.get('tag') || '');

  const posts = usePostStore.use.posts();

  const { fetchPosts, fetchPostsByTag } = usePost();

  // 게시물 추가
  // const addPost = async () => {
  //   try {
  //     const data = await addPostApi(newPost);

  //     setPosts([data, ...posts]);
  //     setShowAddDialog(false);
  //     setNewPost({ title: '', body: '', userId: 1 });
  //   } catch (error) {
  //     console.error('게시물 추가 오류:', error);
  //   }
  // };

  // // 게시물 업데이트
  // const updatePost = async () => {
  //   try {
  //     if (!selectedPost || !selectedPost?.id) {
  //       throw new Error();
  //     }
  //     const data = await updatePostApi(selectedPost.id, selectedPost);
  //     setPosts(posts.map((post) => (post.id === data.id ? data : post)));
  //     setShowEditDialog(false);
  //   } catch (error) {
  //     console.error('게시물 업데이트 오류:', error);
  //   }
  // };

  // 댓글 추가
  // const addComment = async () => {
  //   try {
  //     const data = await addCommentApi(newComment);

  //     setComments((prev) => ({
  //       ...prev,
  //       [data.postId]: [...(prev[data.postId] || []), data],
  //     }));
  //     setShowAddCommentDialog(false);
  //     setNewComment({ body: '', postId: null, userId: 1 });
  //   } catch (error) {
  //     console.error('댓글 추가 오류:', error);
  //   }
  // };

  // // 댓글 업데이트
  // const updateComment = async () => {
  //   try {
  //     if (!selectedComment || !selectedComment?.id || selectedComment?.body) {
  //       throw new Error();
  //     }
  //     const data = await updateCommentApi(selectedComment.id, selectedComment.body);

  //     setComments((prev) => ({
  //       ...prev,
  //       [data.postId]: prev[data.postId].map((comment) => (comment.id === data.id ? data : comment)),
  //     }));
  //     setShowEditCommentDialog(false);
  //   } catch (error) {
  //     console.error('댓글 업데이트 오류:', error);
  //   }
  // };

  // // 댓글 삭제
  // const deleteComment = async (id: number, postId: number) => {
  //   try {
  //     await deleteCommentApi(id);

  //     setComments((prev) => ({
  //       ...prev,
  //       [postId]: prev[postId].filter((comment) => comment.id !== id),
  //     }));
  //   } catch (error) {
  //     console.error('댓글 삭제 오류:', error);
  //   }
  // };

  // 댓글 좋아요
  const likeComment = async (id: number, postId: number) => {
    try {
      const response = await fetch(`/api/comments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ likes: comments[postId].find((c) => c.id === id).likes + 1 }),
      });
      const data = await response.json();
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].map((comment) => (comment.id === data.id ? data : comment)),
      }));
    } catch (error) {
      console.error('댓글 좋아요 오류:', error);
    }
  };

  // 게시물 상세 보기
  // const openPostDetail = (post) => {
  //   setSelectedPost(post);
  //   fetchComments(post.id);
  //   setShowPostDetailDialog(true);
  // };

  // // 사용자 모달 열기
  // const openUserModal = async (user) => {
  //   try {
  //     const response = await fetch(`/api/users/${user.id}`);
  //     const userData = await response.json();
  //     setSelectedUser(userData);
  //     setShowUserModal(true);
  //   } catch (error) {
  //     console.error('사용자 정보 가져오기 오류:', error);
  //   }
  // };

  useEffect(() => {
    if (selectedTag) {
      fetchPostsByTag(selectedTag);
    } else {
      fetchPosts({});
    }
    // updateURL();
  }, [selectedTag]);

  // 하이라이트 함수 추가
  const highlightText = (text: string, highlight: string) => {
    if (!text) return null;
    if (!highlight.trim()) {
      return <span>{text}</span>;
    }
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, i) => (regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>))}
      </span>
    );
  };

  // 댓글 렌더링
  const renderComments = (postId) => (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button
          size="sm"
          onClick={() => {
            setNewComment((prev) => ({ ...prev, postId }));
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
  const changeOpen = useModalStore.use.changeOpen();
  const selectModalType = useModalStore.use.selectModalType();

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button
            onClick={() => {
              selectModalType('addPost');
              changeOpen(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <SearchFilter />

          {/* 게시물 테이블 */}
          {loading ? <Loading /> : <PostTable posts={posts} />}

          {/* 페이지네이션 */}
          <Pagination />
        </div>
      </CardContent>

      {/* 게시물 추가 대화상자 */}
      <ModalCombine />
    </Card>
  );
};

export default PostsManager;
