import { Post } from "@/entities/post/model/types";

import { Table } from "@/shared/ui";

import ModalUserInfo from "@/features/user/ui/modals/ModalUserInfo";
import { PostTableRowActions, PostTableRowReactions, PostTableRowTags, PostTableRowTitle } from "./row";

type PostTableRowProps = {
  post: Post;
};

export const PostTableRow = ({ post }: PostTableRowProps) => {
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
