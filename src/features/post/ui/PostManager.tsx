
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../shared/ui';
import { Plus, Search } from 'lucide-react';
import PostTable from '../../../widgets/post/ui/PostTable';
import AddPostDialog  from './AddPostDialog';
import EditPostDialog from './EditPostDialog';
import TagList from '../../../entities/tag/ui/TagList';
import { usePost } from '../model/usePost';
import { usePostStore } from '../model/store';
import { NewPost, Post } from '../../../entities/post/model/types';

const PostsManager: React.FC = () => {
  const {
    posts,
    total,
    tags,
    isPostsLoading,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    selectedTag,
    setSelectedTag,
    limit,
    setLimit,
    skip,
    setSkip,
    addPost,
    updatePost,
    deletePost,
    openPostDetail,
    openUserModal,
  } = usePost();

  const { selectedPost, setSelectedPost } = usePostStore();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const handleEditPost = (post: Post) => {
    setSelectedPost(post);
    setShowEditDialog(true);
  };

  const handleAddPost = async (newPost: NewPost) => {
    await addPost(newPost);
    setShowAddDialog(false);
  };

  const handleUpdatePost = (updatedPost: NewPost) => {
    updatePost(updatedPost);
    setShowEditDialog(false);
    // setNewPost({ title: "", body: "", userId: 1 });
  };

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
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="게시물 검색..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <TagList tags={tags} selectedTag={selectedTag} onSelectTag={setSelectedTag} />
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
          {isPostsLoading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostTable
              posts={posts}
              searchQuery={searchQuery}
              selectedTag={selectedTag}
              setSelectedTag={setSelectedTag}
              onEditPost={handleEditPost}
              onDeletePost={deletePost}
              onOpenPostDetail={openPostDetail}
              onOpenUserModal={openUserModal}
            />
          )}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span>표시</span>
              <Select value={limit.toString()} onValueChange={(value: React.ChangeEvent<HTMLSelectElement>) => setLimit(Number(value))}>
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
      {showAddDialog && (
        <AddPostDialog
          isOpen={showAddDialog}
          onClose={() => setShowAddDialog(false)}
          onSubmit={handleAddPost}
        />
      )}
      {showEditDialog && (
        <EditPostDialog
          isOpen={showEditDialog}
          onClose={() => setShowEditDialog(false)}
          onSubmit={handleUpdatePost}
          post={selectedPost}
        />
      )}
      
    </Card>
  );
};

export default PostsManager;