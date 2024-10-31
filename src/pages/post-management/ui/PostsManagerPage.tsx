import { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/card/Card';
import { Dialog, DialogContent } from '@/shared/ui/dialog/Dialog';
import { PostsTableWidget } from '@/widgets/post-management/ui/PostsTable';
import { PostDetailsWidget } from '@/widgets/post-management/ui/PostDetails';
import { SearchFilter } from '@/features/post-management/ui/PostAction';
import { Pagination } from '@/features/post-management/ui/Pagination';
import { AddPostButton, AddPostDialog, EditPostDialog } from '@/features/post-management/ui/PostDialogs';
import { UserDetailsDialog } from '@/features/user-management/ui/UserActions';
import { usePostStore } from '@/entities/post/model/store';

export const PostsManagerPage: FC = () => {
  const location = useLocation();
  const { 
    selectedPost,
    filters,
    total,
    updateFilters,
    fetchPosts,
    setSelectedPost
  } = usePostStore();

  // URL 파라미터 처리
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const newFilters = {
      skip: parseInt(params.get("skip") || "0"),
      limit: parseInt(params.get("limit") || "10"),
      searchQuery: params.get("search") || "",
      sortBy: params.get("sortBy") || "",
      sortOrder: (params.get("sortOrder") || "asc") as 'asc' | 'desc',
      selectedTag: params.get("tag") || "",
    };
    
    updateFilters(newFilters);
  }, [location.search, updateFilters]);

  // 필터 변경시 게시물 조회
  useEffect(() => {
    fetchPosts();
  }, [filters, fetchPosts]);

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <AddPostButton />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <SearchFilter />
          <PostsTableWidget />
          <Pagination
            total={total}
            limit={filters.limit}
            skip={filters.skip}
            onPageChange={(skip) => updateFilters({ skip })}
            onLimitChange={(limit) => updateFilters({ limit })}
          />
        </div>
      </CardContent>
        {/* 수정필요 */}
      <AddPostDialog />
      <EditPostDialog />
      <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
        <DialogContent>
          {selectedPost && (
            <PostDetailsWidget 
              post={selectedPost}
              onClose={() => setSelectedPost(null)}
            />
          )}
        </DialogContent>
      </Dialog>
      <UserDetailsDialog />
    </Card>
  );
};