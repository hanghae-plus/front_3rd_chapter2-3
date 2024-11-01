import { TableCell } from "@/shared/ui";
import { PostItemType } from "../model/post-type";

export const PostId = ({ post }: PostItemType) => {
  return <TableCell>{post.id}</TableCell>;
};
