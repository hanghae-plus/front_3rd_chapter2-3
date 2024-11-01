import { useAtom } from 'jotai';
import { useState } from 'react';
import { Plus, Search } from 'lucide-react';

import { Button } from '@shared/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@shared/ui/Card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@shared/ui/Dialog';
import { Input } from '@shared/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@shared/ui/Select';
import { Textarea } from '@shared/ui/Textarea';

import { useFetchPosts, useAddPost, useUpdatePost, useDeletePost } from '@features/home/api/useFetchPost';

import { usePost } from '@features/home/model/usePost';
import { newPostAtom } from '@entities/home/model/postAtoms';
import { usePostFilter } from '@features/home/model/usePostFilter';
import useTag from '@features/home/model/useTag';

import PostTable from '@widgets/home/PostTable';
import PostUserDialog from '@widgets/home/PostUserDialog';
import PostDetailDialog from '@widgets/home/PostDetailDialog';

const Home = () => {
  const { tags } = useTag();

  const { selectedPost, setSelectedPost } = usePost();
  const [newPost, setNewPost] = useAtom(newPostAtom);

  const [newComment, setNewComment] = useState<Comment>({} as Comment);
  const [selectedComment, setSelectedComment] = useState<Comment>({} as Comment);

  const [showAddDialog, setShowAddDialog] = useState<boolean>(false);
  const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
  const [showAddCommentDialog, setShowAddCommentDialog] = useState<boolean>(false);
  const [showEditCommentDialog, setShowEditCommentDialog] = useState<boolean>(false);

  const {
    filters: { search, tag, page, pageSize, sortBy, sortOrder },
    setSearch,
    setTag,
    setPage,
    setPageSize,
    setSortBy,
    setSortOrder,
    setSorting,
  } = usePostFilter();
  const { pageCount } = useFetchPosts();

  const { mutate: addPost } = useAddPost();
  const { mutate: updatePost } = useUpdatePost();
  const { mutate: deletePost } = useDeletePost();

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
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && setSorting(sortBy, sortOrder)}
                />
              </div>
            </div>
            <Select
              value={tag}
              onValueChange={(value) => {
                setTag(value);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="태그 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 태그</SelectItem>
                {tags.map((tag) => (
                  <SelectItem
                    key={tag.url}
                    value={tag.slug}
                  >
                    {tag.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={sortBy}
              onValueChange={(value) => setSortBy(value)}
            >
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
            <Select
              value={sortOrder}
              onValueChange={(value) => setSortOrder(value as 'asc' | 'desc')}
            >
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
          <PostTable />

          {/* 페이지네이션 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span>표시</span>
              <Select
                value={pageSize.toString()}
                onValueChange={(value) => setPageSize(Number(value))}
              >
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
              <Button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                이전
              </Button>
              <Button
                disabled={page >= pageCount}
                onClick={() => setPage(page + 1)}
              >
                다음
              </Button>
            </div>
          </div>
        </div>
      </CardContent>

      {/* 게시물 추가 대화상자 */}
      <Dialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
      >
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
            <Button onClick={() => addPost(newPost)}>게시물 추가</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 게시물 수정 대화상자 */}
      <Dialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>게시물 수정</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="제목"
              value={selectedPost?.title || ''}
              onChange={(e) => selectedPost && setSelectedPost({ ...selectedPost, title: e.target.value })}
            />
            <Textarea
              rows={15}
              placeholder="내용"
              value={selectedPost?.body || ''}
              onChange={(e) => selectedPost && setSelectedPost({ ...selectedPost, body: e.target.value })}
            />
            <Button onClick={() => selectedPost && updatePost(selectedPost)}>게시물 업데이트</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 댓글 추가 대화상자 */}
      <Dialog
        open={showAddCommentDialog}
        onOpenChange={setShowAddCommentDialog}
      >
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
            <Button onClick={() => addComment(newComment)}>댓글 추가</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 댓글 수정 대화상자 */}
      <Dialog
        open={showEditCommentDialog}
        onOpenChange={setShowEditCommentDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>댓글 수정</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="댓글 내용"
              value={selectedComment?.body || ''}
              onChange={(e) => selectedComment && setSelectedComment({ ...selectedComment, body: e.target.value })}
            />
            <Button onClick={() => selectedComment && updateComment(selectedComment)}>댓글 업데이트</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 게시물 상세 보기 대화상자 */}
      <PostDetailDialog />

      {/* 사용자 모달 */}
      <PostUserDialog />
    </Card>
  );
};

export default Home;
