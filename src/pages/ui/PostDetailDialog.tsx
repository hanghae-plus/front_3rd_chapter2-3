import { Plus } from "lucide-react"
import HighlightText from "../../shared/ui/HighlightText"
import { Button } from "../../shared/ui/Button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../shared/ui/Dialog"
import { usePost } from "../../features/post/model/usePost"
import { useComment } from "../../features/comment/model/useComment"
import { usePostDialog } from "../../features/post/model/usePostDialog"
import useQueryComments from "../../features/comment/api/useQueryComments"
import { useEffect } from "react"
import CommentArea from "../../features/comment/ui/CommentArea"

interface Props {
  searchQuery: string
}

const PostDetailDialog = ({ searchQuery }: Props) => {
  const { selectedPost } = usePost()
  const { comments, setComments, setNewComment, setShowAddCommentDialog } = useComment()
  const { showPostDetailDialog, setShowPostDetailDialog } = usePostDialog()
  // todo selectedPost 값이 undefined일때 해결필요
  const { data, error } = useQueryComments(selectedPost?.id as number)

  useEffect(() => {
    if (error) {
      console.error("댓글 가져오기 오류:", error)
      return
    }
    if (!data || comments?.[selectedPost?.id as number]) return
    setComments((prev) => ({ ...prev, [selectedPost?.id as number]: data.comments }))
  }, [data])

  // 댓글 렌더링
  const renderComments = (postId: number) => (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button
          size="sm"
          onClick={() => {
            setNewComment((prev) => ({ ...prev, postId }))
            setShowAddCommentDialog(true)
          }}
        >
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {comments[postId]?.map((comment) => (
          <CommentArea comment={comment} postId={postId} searchQuery={searchQuery} />
        ))}
      </div>
    </div>
  )
  return (
    <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            <HighlightText text={selectedPost?.title} highlight={searchQuery} />
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>
            <HighlightText text={selectedPost?.body} highlight={searchQuery} />
          </p>
          {renderComments(selectedPost?.id as number)}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PostDetailDialog
