import { Post } from '~/entities/post/model/types';

import { TableCell, TableRow } from '~/shared/ui/Table';

import { PostAuthorCell } from '../../features/post-table/ui/PostAuthorCell';
import { PostReactionCell } from '../../features/post-table/ui/PostReactionCell';
import { PostTitleCell } from '../../features/post-table/ui/PostTitleCell';
import { PostWorksCell } from '../../features/post-table/ui/PostWorksCell';

export const PostTableRow = ({ post }: { post: Post }) => {
  return (
    <TableRow>
      <TableCell>{post.id}</TableCell>
      <TableCell>
        <PostTitleCell post={post} />
      </TableCell>
      <TableCell>
        <PostAuthorCell author={post.author} />
      </TableCell>
      <TableCell>
        <PostReactionCell reactions={post.reactions} />
      </TableCell>
      <TableCell>
        <PostWorksCell post={post} />
      </TableCell>
    </TableRow>
  );
};
