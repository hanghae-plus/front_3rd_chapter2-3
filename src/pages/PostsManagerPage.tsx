import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Loading } from '~/widgets/layout/ui/Loading';
import { Pagination } from '~/widgets/pagination/ui/Pagination';
import { PostTable } from '~/widgets/post-table/ui/PostTable';
import { SearchFilter } from '~/widgets/search-filter/ui/SearchFilter';

import { ModalCombine } from '~/features/modal/ui/ModalCombine';
import { usePost } from '~/features/post/model/usePost';
import { useOwnSearchParams } from '~/features/search/model/useSearchParams';

import { CommentResponseDto } from '~/entities/comment/model/type';
import { useModalStore } from '~/entities/modal/model/modalStore';
import { usePostStore } from '~/entities/post/model/store';

import { Button } from '~/shared/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '~/shared/ui/Card';

const PostsManager = () => {
  // 상태 관리

  const [loading, setLoading] = useState(false);

  const [comments, setComments] = useState<Record<string, CommentResponseDto[]>>({});

  const posts = usePostStore.use.posts();

  const { selectedTag } = useOwnSearchParams();

  const { fetchPosts, fetchPostsByTag } = usePost();

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
