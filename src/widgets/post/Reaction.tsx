import { ThumbsDown, ThumbsUp } from "lucide-react";

type Props = {
  reactions: Reaction;
};

export function Reaction({ reactions }: Props) {
  const { likes, dislikes } = reactions;
  return (
    <div className="flex items-center gap-2">
      <ThumbsUp className="w-4 h-4" />
      <span>{likes}</span>
      <ThumbsDown className="w-4 h-4" />
      <span>{dislikes}</span>
    </div>
  );
}
