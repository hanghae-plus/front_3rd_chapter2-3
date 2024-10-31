import { PostTableRow } from '~/widgets/post-table/PostTableRow';

import { Post } from '~/entities/post/model/types';

import { Table, TableBody, TableHead, TableHeader, TableRow } from '~/shared/ui/Table';

// 게시물 테이블 렌더링
export const PostTable = ({ posts }: { posts: Post[] }) => {
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
          <PostTableRow key={post.id} post={post} />
        ))}
      </TableBody>
    </Table>
  );
};
