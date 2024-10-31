import { atom, useAtom } from "jotai"
import { commentCreateApi } from "../api/commentCreateApi"
import { commentDeleteApi } from "../api/commentDeleteApi"
import { commentLikeApi } from "../api/commentLikeAip"
import { commentUpdateApi } from "../api/commentUpdateApi"
import { showAddCommentDialogAtom, showEditCommentDialogAtom } from "../model/commentAtom"

const commentsAtom = atom<Comment[]>([])

export const useCommentHandler = () => {
  const [, setComments] = useAtom(commentsAtom)
  const [, setShowEditCommentDialog] = useAtom(showEditCommentDialogAtom)
  const [, setShowAddCommentDialog] = useAtom(showAddCommentDialogAtom)

  // 댓글 추가
  const commentCreate = async (newComment: Comment) => {
    const createComment = await commentCreateApi(newComment)

    if (!createComment) {
      return
    }

    setComments((prev) => [...prev, createComment])
    setShowAddCommentDialog(false)
  }

  // 댓글 삭제
  const deleteComment = async (deleteId: number) => {
    const deleteComment = await commentDeleteApi(deleteId)
    if (!deleteComment) {
      return
    }
    alert("삭제완료")
    setComments((prev) => prev.filter((comment) => comment.id !== deleteId))
  }

  // 댓글 좋아요
  const likeComment = async (id: number) => {
    const data = await commentLikeApi(id)

    if (!data) {
      return
    }
    setComments((prev) => prev.map((comment) => (comment.id === id ? { ...comment, likes: data.likes } : comment)))
  }

  // 댓글 업데이트
  // TODO: 오류수정.
  const updateComment = async (selectedComment: Comment) => {
    console.log("댓글 업데이트 시작")

    try {
      const data = await commentUpdateApi(selectedComment)

      if (!data) {
        console.error("댓글 업데이트 실패: 데이터 없음")
        return
      }

      console.log("업데이트된 댓글 데이터:", data)

      // 상태 업데이트 후 후속 작업을 위한 상태 변수를 만들어준다.
      setComments((prev) => {
        return [...prev.filter((comment) => comment.id !== data.id), data] // 기존 댓글을 필터링하고 새로운 댓글을 추가
      })

      setShowEditCommentDialog(false)
      console.log("편집 대화 상자 닫힘")
    } catch (error) {
      console.error("댓글 업데이트 중 오류 발생:", error)
      // 사용자에게 오류 메시지 표시 등 추가 처리 가능
    }
  }

  return {
    commentCreate,
    deleteComment,
    likeComment,
    updateComment,
  }
}
