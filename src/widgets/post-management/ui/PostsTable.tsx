import { FC } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/shared/ui/table/Table';
import { PostActions } from '@/features/post-management/ui/PostAction';
import { PostTags } from '@/features/post-management/ui/PostTags';
import { usePostStore } from '@/entities/post/model/store';
import { useUserStore } from '@/entities/user/model/store';
import { Post } from '@/entities/post/model/types';
import { highlightText } from '@/shared/utils/highlightText'; 
import { PostReactions } from '@/features/post-management/ui/PostAction'; 

export const PostsTableWidget: FC = () => {
  const { posts, loading, filters, deletePost, setSelectedPost } = usePostStore();
  const { fetchUserDetails } = useUserStore();

  const handleUserClick = (userId: number) => {
    fetchUserDetails(userId);
  };

  if (loading) {
    return <div className="flex justify-center p-4">로딩 중...</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">ID</TableHead>
          <TableHead>제목</TableHead>
          <TableHead className="w-[150px]">작성자</TableHead>
          <TableHead className="w-[150px]">반응</TableHead>
          <TableHead className="w-[150px]">작업</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id}>
            <TableCell>{post.id}</TableCell>
            <TableCell>
              <div className="space-y-1">
                <div>{highlightText(post.title, filters.searchQuery)}</div>
                <PostTags tags={post.tags} />
              </div>
            </TableCell>
            <TableCell>
              <div 
                className="flex items-center space-x-2 cursor-pointer" 
                onClick={() => handleUserClick(post.userId)}
              >
                <img 
                  src={post.author?.image} 
                  alt={post.author?.username} 
                  className="w-8 h-8 rounded-full" 
                />
                <span>{post.author?.username}</span>
              </div>
            </TableCell>
            <TableCell>
              <PostReactions reactions={post.reactions} />
            </TableCell>
            <TableCell>
              <PostActions
                post={post}
                onView={(post: Post | null) => setSelectedPost(post)}
                onEdit={(post: Post | null) => setSelectedPost(post)}
                onDelete={deletePost}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};