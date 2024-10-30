import { ThumbsUp, ThumbsDown } from "lucide-react"
import { cn } from "../../../../../shared/lib/utils/cn"

interface PostReactionsProps {
  reactions: {
    likes: number
    dislikes: number
  }
  onLike?: () => void
  onDislike?: () => void
  className?: string
  size?: "sm" | "default"
  interactive?: boolean
}

export const PostReactions = ({
  reactions,
  onLike,
  onDislike,
  className = "",
  size = "default",
  interactive = false,
}: PostReactionsProps) => {
  const iconSize = size === "sm" ? "w-3 h-3" : "w-4 h-4"
  const textSize = size === "sm" ? "text-xs" : "text-sm"

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className={cn(
          "flex items-center gap-1",
          interactive && "cursor-pointer hover:text-blue-500 transition-colors",
        )}
        onClick={interactive ? onLike : undefined}
      >
        <ThumbsUp className={iconSize} />
        <span className={textSize}>{reactions.likes}</span>
      </div>
      <div
        className={cn(
          "flex items-center gap-1",
          interactive && "cursor-pointer hover:text-red-500 transition-colors",
        )}
        onClick={interactive ? onDislike : undefined}
      >
        <ThumbsDown className={iconSize} />
        <span className={textSize}>{reactions.dislikes}</span>
      </div>
    </div>
  )
}
