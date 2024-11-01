import { TableCell } from "@/shared/ui";
import { PostItemType } from "../model/post-type";
import { ThumbsDown, ThumbsUp } from "lucide-react";

export const PostLike = ({ post }: PostItemType) => {
  return (
    <TableCell>
      <div className="flex items-center gap-2">
        <ThumbsUp className="w-4 h-4" />
        <span>{post.reactions?.likes || 0}</span>
        <ThumbsDown className="w-4 h-4" />
        <span>{post.reactions?.dislikes || 0}</span>
      </div>
    </TableCell>
  );
};
