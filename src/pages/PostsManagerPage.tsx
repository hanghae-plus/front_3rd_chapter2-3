import { Edit2, Plus, ThumbsUp, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Loading } from '~/widgets/layout/ui/Loading';
import { Pagination } from '~/widgets/pagination/ui/Pagination';
import { PostTable } from '~/widgets/post-table/ui/PostTable';
import { SearchFilter } from '~/widgets/search-filter/ui/SearchFilter';

import { usePost } from '~/features/post/model/usePost';
import { UserModal } from '~/features/user-modal/ui/UserModal';

import {
  addComment as addCommentApi,
  deleteComment as deleteCommentApi,
  updateComment as updateCommentApi,
} from '~/entities/comment/api/commentApi';
import { CommentResponseDto } from '~/entities/comment/model/type';
import { addPost as addPostApi, updatePost as updatePostApi } from '~/entities/post/api/postApi';
import { usePostStore } from '~/entities/post/model/store';
import { PostResponseDto } from '~/entities/post/model/types';
import { TagResponseDto } from '~/entities/tag/model/type';

import { Button } from '~/shared/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '~/shared/ui/Card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/shared/ui/Dialog';
import { Input } from '~/shared/ui/Input';
import { Textarea } from '~/shared/ui/Textarea';

const PostsManager = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // 상태 관리
  const [_, setPosts] = useState<any>([]);
  const [tags, setTags] = useState<TagResponseDto[]>([]);

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

  const [skip, setSkip] = useState(parseInt(queryParams.get('skip') || '0'));
  const [limit, setLimit] = useState(parseInt(queryParams.get('limit') || '10'));
  const [searchQuery, setSearchQuery] = useState(queryParams.get('search') || '');
  const [selectedPost, setSelectedPost] = useState<PostResponseDto | null>(null);
  const [sortBy, setSortBy] = useState(queryParams.get('sortBy') || '');
  const [sortOrder, setSortOrder] = useState(queryParams.get('sortOrder') || 'asc');
  const [selectedTag, setSelectedTag] = useState(queryParams.get('tag') || '');

  const posts = usePostStore.use.posts();

  const { fetchPosts } = usePost();

  // URL 업데이트 함수
  const updateURL = () => {
    const params = new URLSearchParams();
    if (skip) params.set('skip', skip.toString());
    if (limit) params.set('limit', limit.toString());
    if (searchQuery) params.set('search', searchQuery);
    if (sortBy) params.set('sortBy', sortBy);
    if (sortOrder) params.set('sortOrder', sortOrder);
    if (selectedTag) params.set('tag', selectedTag);
    navigate(`?${params.toString()}`);
  };

  // // 게시물 가져오기
  // const fetchPosts = async () => {
  //   setLoading(true);
  //   try {
  //     const postsData = await fetchAllPosts({ limit, skip });
  //     const { users } = await fetchAllUser();

  //     const postsWithUsers = postsData.posts.map((post) => ({
  //       ...post,
  //       author: users.find((user) => user.id === post.userId),
  //     }));

  //     fetchPostAction({ posts: postsWithUsers, total: postsData.total });
  //   } catch (error) {
  //     console.error('게시물 가져오기 오류:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // // 태그 가져오기
  // const fetchTags = async () => {
  //   try {
  //     const tags = await fetchAllPostTags();
  //     setTags(tags);
  //   } catch (error) {
  //     console.error('태그 가져오기 오류:', error);
  //   }
  // };

  // 게시물 검색
  // const searchPosts = async () => {
  //   if (!searchQuery) {
  //     fetchPosts();
  //     return;
  //   }
  //   setLoading(true);
  //   try {
  //     const response = await fetch(`/api/posts/search?q=${searchQuery}`);
  //     const data = await response.json();
  //     setPosts(data.posts);
  //     fetchPostAction({ posts: data.posts, total: data.total });
  //   } catch (error) {
  //     console.error('게시물 검색 오류:', error);
  //   }
  //   setLoading(false);
  // };

  // 태그별 게시물 가져오기
  // const fetchPostsByTag = async (tag?: string) => {
  //   if (!tag || tag === 'all') {
  //     fetchPosts();
  //     return;
  //   }
  //   setLoading(true);
  //   try {
  //     const [postsData, usersData] = await Promise.all([fetchPostsByTagApi(tag), fetchAllUser()]);
  //     const postsWithUsers = postsData.posts.map((post) => ({
  //       ...post,
  //       author: usersData.users.find((user) => user.id === post.userId),
  //     }));

  //     // setPosts(postsWithUsers);
  //     fetchPostAction({ posts: postsWithUsers, total: postsData.total });
  //   } catch (error) {
  //     console.error('태그별 게시물 가져오기 오류:', error);
  //   }
  //   setLoading(false);
  // };

  // 게시물 추가
  const addPost = async () => {
    try {
      const data = await addPostApi(newPost);

      setPosts([data, ...posts]);
      setShowAddDialog(false);
      setNewPost({ title: '', body: '', userId: 1 });
    } catch (error) {
      console.error('게시물 추가 오류:', error);
    }
  };

  // 게시물 업데이트
  const updatePost = async () => {
    try {
      if (!selectedPost || !selectedPost?.id) {
        throw new Error();
      }
      const data = await updatePostApi(selectedPost.id, selectedPost);
      setPosts(posts.map((post) => (post.id === data.id ? data : post)));
      setShowEditDialog(false);
    } catch (error) {
      console.error('게시물 업데이트 오류:', error);
    }
  };

  // 댓글 추가
  const addComment = async () => {
    try {
      const data = await addCommentApi(newComment);

      setComments((prev) => ({
        ...prev,
        [data.postId]: [...(prev[data.postId] || []), data],
      }));
      setShowAddCommentDialog(false);
      setNewComment({ body: '', postId: null, userId: 1 });
    } catch (error) {
      console.error('댓글 추가 오류:', error);
    }
  };

  // 댓글 업데이트
  const updateComment = async () => {
    try {
      if (!selectedComment || !selectedComment?.id || selectedComment?.body) {
        throw new Error();
      }
      const data = await updateCommentApi(selectedComment.id, selectedComment.body);

      setComments((prev) => ({
        ...prev,
        [data.postId]: prev[data.postId].map((comment) => (comment.id === data.id ? data : comment)),
      }));
      setShowEditCommentDialog(false);
    } catch (error) {
      console.error('댓글 업데이트 오류:', error);
    }
  };

  // 댓글 삭제
  const deleteComment = async (id: number, postId: number) => {
    try {
      await deleteCommentApi(id);

      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((comment) => comment.id !== id),
      }));
    } catch (error) {
      console.error('댓글 삭제 오류:', error);
    }
  };

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

  // useEffect(() => {
  //   fetchTags();
  // }, []);

  useEffect(() => {
    if (selectedTag) {
      fetchPostsByTag(selectedTag);
    } else {
      fetchPosts({});
    }
    updateURL();
  }, [skip, limit, sortBy, sortOrder, selectedTag]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSkip(parseInt(params.get('skip') || '0'));
    setLimit(parseInt(params.get('limit') || '10'));
    setSearchQuery(params.get('search') || '');
    setSortBy(params.get('sortBy') || '');
    setSortOrder(params.get('sortOrder') || 'asc');
    setSelectedTag(params.get('tag') || '');
  }, [location.search]);

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
          <SearchFilter />

          {/* 게시물 테이블 */}
          {loading ? <Loading /> : <PostTable posts={posts} />}

          {/* 페이지네이션 */}
          <Pagination />
        </div>
      </CardContent>

      {/* 게시물 추가 대화상자 */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>새 게시물 추가</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="제목"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            />
            <Textarea
              rows={30}
              placeholder="내용"
              value={newPost.body}
              onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
            />
            <Input
              type="number"
              placeholder="사용자 ID"
              value={newPost.userId}
              onChange={(e) => setNewPost({ ...newPost, userId: Number(e.target.value) })}
            />
            <Button onClick={addPost}>게시물 추가</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 게시물 수정 대화상자 */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>게시물 수정</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="제목"
              value={selectedPost?.title || ''}
              onChange={(e) => setSelectedPost({ ...selectedPost, title: e.target.value })}
            />
            <Textarea
              rows={15}
              placeholder="내용"
              value={selectedPost?.body || ''}
              onChange={(e) => setSelectedPost({ ...selectedPost, body: e.target.value })}
            />
            <Button onClick={updatePost}>게시물 업데이트</Button>
          </div>
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
          <div className="space-y-4">
            <Textarea
              placeholder="댓글 내용"
              value={selectedComment?.body || ''}
              onChange={(e) => setSelectedComment({ ...selectedComment, body: e.target.value })}
            />
            <Button onClick={updateComment}>댓글 업데이트</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 게시물 상세 보기 대화상자 */}
      <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{highlightText(selectedPost?.title, searchQuery)}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>{highlightText(selectedPost?.body, searchQuery)}</p>
            {renderComments(selectedPost?.id)}
          </div>
        </DialogContent>
      </Dialog>

      {/* 사용자 모달 */}
      <UserModal />
      {/* <Dialog open={showUserModal} onOpenChange={setShowUserModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>사용자 정보</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <img src={selectedUser?.image} alt={selectedUser?.username} className="w-24 h-24 rounded-full mx-auto" />
            <h3 className="text-xl font-semibold text-center">{selectedUser?.username}</h3>
            <div className="space-y-2">
              <p>
                <strong>이름:</strong> {selectedUser?.firstName} {selectedUser?.lastName}
              </p>
              <p>
                <strong>나이:</strong> {selectedUser?.age}
              </p>
              <p>
                <strong>이메일:</strong> {selectedUser?.email}
              </p>
              <p>
                <strong>전화번호:</strong> {selectedUser?.phone}
              </p>
              <p>
                <strong>주소:</strong> {selectedUser?.address?.address}, {selectedUser?.address?.city},{' '}
                {selectedUser?.address?.state}
              </p>
              <p>
                <strong>직장:</strong> {selectedUser?.company?.name} - {selectedUser?.company?.title}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog> */}
    </Card>
  );
};

export default PostsManager;
