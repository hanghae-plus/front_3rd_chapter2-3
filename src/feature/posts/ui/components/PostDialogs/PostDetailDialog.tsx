import { PostContent } from "../../../../../entities/post/ui/components/PostContent/PostContent"
import { PostHeader } from "../../../../../entities/post/ui/components/PostHeader/PostHeader"
import { PostTags } from "../../../../../entities/post/ui/components/PostTags/PostTags"
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
          <PostHeader post={post} reactions={<PostReactionsContainer post={post} />} />
        </DialogHeader>
        <div className="space-y-4">
          <PostContent body={post.body} />
          <PostTags tags={post.tags} />
          <div className="border-t pt-4">
            <CommentList postId={post.id} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
