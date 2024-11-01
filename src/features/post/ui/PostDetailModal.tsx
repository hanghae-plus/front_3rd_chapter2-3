import { Button, Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui"
import { highlightText } from "@/shared/lib"
import { useModalStore } from "@/features/modal"
import { usePostStore } from "@/features/post"
import { useSearchStore } from "@/features/search"
import { Plus } from "lucide-react"
import { useFetchComments } from "@/features/comment"
import { PostCommentLikeButton } from "@/features/post/ui/PostCommentLikeButton"
import { PostCommentEditButton } from "@/features/post/ui/PostCommentEditButton"
import PostCommentDeleteButton from "@/features/post/ui/PostCommentDeleteButton"

export const PostDetailModal = () => {
  const { showPostModal, closePostModal, openAddCommentModal } = useModalStore()
  const { post: selectedPost } = usePostStore()
  const { searchQuery } = useSearchStore()
  const { data } = useFetchComments(selectedPost?.id ?? -1)
  const { comments } = data ?? { comments: [] }

  return (
    <Dialog open={showPostModal} onOpenChange={closePostModal}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(selectedPost?.title ?? "", searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(selectedPost?.body ?? "", searchQuery)}</p>
          <div className="mt-2">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold">댓글</h3>
              <Button
                size="sm"
                onClick={() => {
                  openAddCommentModal()
                }}
              >
                <Plus className="w-3 h-3 mr-1" />
                댓글 추가
              </Button>
            </div>
            <div className="space-y-1">
              {comments?.map((comment) => (
                <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
                  <div className="flex items-center space-x-2 overflow-hidden">
                    <span className="font-medium truncate">{comment.user.username}:</span>
                    <span className="truncate">{highlightText(comment.body, searchQuery)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <PostCommentLikeButton comment={comment} />
                    <PostCommentEditButton />
                    <PostCommentDeleteButton comment={comment} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
