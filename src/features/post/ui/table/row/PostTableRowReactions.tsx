import { Post } from "@/entities/post/model/types";
import { ThumbsDown, ThumbsUp } from "lucide-react";

type PostTableRowReactionsProps = {
  reactions: Post["reactions"];
};

export const PostTableRowReactions = ({ reactions }: PostTableRowReactionsProps) => {
  return (
    <div className="flex items-center gap-2">
      <ThumbsUp className="w-4 h-4" />
      <span>{reactions?.likes || 0}</span>
      <ThumbsDown className="w-4 h-4" />
      <span>{reactions?.dislikes || 0}</span>
    </div>
  );
};
