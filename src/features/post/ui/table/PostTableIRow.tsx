import { Post } from "@/entities/post/model/types";

import PostTableRowActions from "@/features/post/ui/table/PostTableRowActions";
import PostTableRowTags from "@/features/post/ui/table/PostTableRowTags";
import PostTableRowTitle from "@/features/post/ui/table/PostTableRowTitle";
import ModalUserInfo from "@/features/user/ui/modals/ModalUserInfo";

import { Table } from "@/shared/ui";

import PostTableRowReactions from "./PostTableRowReactions";

type PostTableItemProps = {
  post: Post;
};

const PostTableIRow = ({ post }: PostTableItemProps) => {
  return (
    <Table.Row key={post.id}>
      <Table.Cell>{post.id}</Table.Cell>
      <Table.Cell>
        <div className="space-y-1">
          <PostTableRowTitle title={post.title} />
          <PostTableRowTags post={post} />
        </div>
      </Table.Cell>
      <Table.Cell>
        <ModalUserInfo user={post.author} />
      </Table.Cell>
      <Table.Cell>
        <PostTableRowReactions reactions={post.reactions} />
      </Table.Cell>
      <Table.Cell>
        <PostTableRowActions post={post} />
      </Table.Cell>
    </Table.Row>
  );
};

export default PostTableIRow;
