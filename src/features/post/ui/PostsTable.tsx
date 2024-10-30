import React from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '../../../shared/ui/Table';
import PostRow from './PostRow';
import { Post } from '../../../entities/post/api/types';

interface PostsTableProps {
  posts?: Post[];
}

const PostTable: React.FC<PostsTableProps> = ({ posts}) => {

  return(
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
        {posts?.map((post) => (
          <PostRow
            key={post.id}
            post={post}
          />
        ))}
      </TableBody>
    </Table>
    )
  }

export default PostTable