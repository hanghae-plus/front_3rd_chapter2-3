import { ThumbsUp, ThumbsDown } from "lucide-react"
import { cn } from "../../../../../shared/lib/utils/cn"
import { Button } from "../../../../../shared"

interface PostReactionButtonProps {
  icon: "like" | "dislike"
  count: number
  onClick?: () => void
  active?: boolean
  size?: "sm" | "default"
  className?: string
}

export const PostReactionButton = ({
  icon,
  count,
  onClick,
  active = false,
  size = "default",
  className,
}: PostReactionButtonProps) => {
  const Icon = icon === "like" ? ThumbsUp : ThumbsDown
  const activeColor = icon === "like" ? "text-blue-500" : "text-red-500"

  return (
    <Button
      variant="ghost"
      size={size}
      onClick={onClick}
      className={cn(
        "flex items-center gap-1",
        active && activeColor,
        className,
      )}
    >
      <Icon className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />
      <span className={size === "sm" ? "text-xs" : "text-sm"}>{count}</span>
    </Button>
  )
}
