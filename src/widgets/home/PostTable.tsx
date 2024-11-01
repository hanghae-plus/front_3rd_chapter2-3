import { FC } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@shared/ui/Table';

import { useFetchPosts } from '@features/home/api/useFetchPost';

import PostTableTitle from '@features/home/ui/PostTableTitle';
import PostTableAuthor from '@features/home/ui/PostTableAuthor';
import PostTableReactions from '@entities/home/ui/PostTableReactions';
import PostTableActions from '@/features/home/ui/PostTableActions';

const PostTable: FC = () => {
  const { posts, loading } = useFetchPosts();

  if (loading) return <div className="flex justify-center p-4">로딩 중...</div>;

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
            {/* ID */}
            <TableCell>{post.id}</TableCell>
            {/* 제목 */}
            <TableCell>
              <PostTableTitle post={post} />
            </TableCell>
            {/* 작성자 */}
            <TableCell>
              <PostTableAuthor author={post.author} />
            </TableCell>
            {/* 반응 */}
            <TableCell>
              <PostTableReactions post={post} />
            </TableCell>
            {/* 작업 */}
            <TableCell>
              <PostTableActions post={post} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

PostTable.displayName = 'PostTable';
export default PostTable;
