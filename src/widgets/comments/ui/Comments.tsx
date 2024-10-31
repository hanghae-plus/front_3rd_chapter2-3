import { Edit2, Plus, ThumbsUp, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { commentApi } from "../../../entities/comment/api/commentApi"
import { Comment, NewComment } from "../../../entities/comment/model/types"
import { usePostQueryParams } from "../../../entities/post"
import { Post } from "../../../entities/post/model/types"
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Textarea,
  TextHighlighter,
} from "../../../shared/ui"

type Props = {
  postId: Post["id"]
}

export const Comments = ({ postId }: Props) => {
  const {
    queryParams: { search: searchQuery },
  } = usePostQueryParams()

  const [comments, setComments] = useState<Comment[]>([])
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)
  const [newComment, setNewComment] = useState<NewComment>({
    body: "",
    postId: null,
    userId: 1,
  })

  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false)
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false)

  // 댓글 가져오기
  const fetchComments = async (postId: number) => {
    if (comments[postId]) return // 이미 불러온 댓글이 있으면 다시 불러오지 않음

    const data = await commentApi.fetchComments(postId)
    if (data) {
      setComments(data.comments)
    }
  }

  useEffect(() => {
    fetchComments(postId)
  }, [])

  // 댓글 추가
  const addComment = async () => {
    const data = await commentApi.addComment(newComment)
    if (data) {
      setComments((prev) => [...prev, data])
      setShowAddCommentDialog(false)
      setNewComment({ body: "", postId: null, userId: 1 })
    }
  }

  // 댓글 업데이트
  const updateComment = async () => {
    if (!selectedComment) return

    const data = await commentApi.updateComment(selectedComment)
    if (data) {
      setComments((prev) =>
        prev.map((comment) => (comment.id === data.id ? data : comment)),
      )
      setShowEditCommentDialog(false)
    }
  }

  // 댓글 삭제
  const deleteComment = async (id: Comment["id"]) => {
    await commentApi.deleteComment(id)
    setComments((prev) => prev.filter((comment) => comment.id !== id))
  }

  // 댓글 좋아요
  const likeComment = async (id: Comment["id"]) => {
    const data = await commentApi.likeComment(
      id,
      comments.find((c) => c.id === id)?.likes,
    )

    if (data) {
      setComments((prev) =>
        prev.map((comment) => (comment.id === data.id ? data : comment)),
      )
    }
  }

  return (
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
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="flex items-center justify-between text-sm border-b pb-1"
          >
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="font-medium truncate">
                {comment.user.username}:
              </span>
              <span className="truncate">
                <TextHighlighter text={comment.body} highlight={searchQuery} />
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => likeComment(comment.id)}
              >
                <ThumbsUp className="w-3 h-3" />
                <span className="ml-1 text-xs">{comment.likes}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedComment(comment)
                  setShowEditCommentDialog(true)
                }}
              >
                <Edit2 className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteComment(comment.id)}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* 댓글 추가 대화상자 */}
      <Dialog
        open={showAddCommentDialog}
        onOpenChange={setShowAddCommentDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>새 댓글 추가</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="댓글 내용"
              value={newComment.body}
              onChange={(e) =>
                setNewComment({ ...newComment, body: e.target.value })
              }
            />
            <Button onClick={addComment}>댓글 추가</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 댓글 수정 대화상자 */}
      <Dialog
        open={showEditCommentDialog}
        onOpenChange={setShowEditCommentDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>댓글 수정</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="댓글 내용"
              value={selectedComment?.body || ""}
              onChange={(e) => {
                if (selectedComment) {
                  setSelectedComment({
                    ...selectedComment,
                    body: e.target.value,
                  })
                }
              }}
            />
            <Button onClick={updateComment}>댓글 업데이트</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
