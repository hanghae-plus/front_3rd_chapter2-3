import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../../../shared"
import { CommentList } from "../../../../comments/ui/components/CommentList"
import type { Post } from "../../../model/types"
import { PostReactionsContainer } from "../PostReaction/PostReactionContainer"

interface PostDetailDialogProps {
  post: Post | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const PostDetailDialog = ({
  post,
  open,
  onOpenChange,
}: PostDetailDialogProps) => {
  if (!post) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>{post.title}</DialogTitle>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>작성자: {post.author?.username}</span>
            <PostReactionsContainer post={post} />
          </div>
        </DialogHeader>
        <div className="space-y-4">
          <div className="prose prose-sm max-w-none">{post.body}</div>
          <div className="flex flex-wrap gap-1">
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="border-t pt-4">
            <CommentList postId={post.id} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
