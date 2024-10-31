import { AddDialog } from "./AddDialog"
import { EditDialog } from "./EditDialog"
import { AddCommentDialog } from "./AddCommentDialog"
import { EditCommentDialog } from "./EditCommentDialog"
import { PostDetailDialog } from "../../Post/ui/PostDetailDialog"
import { UserDialog } from "./UserDialog"

export const DialogContainer = () => {
  return (
    <>
      {/* 게시물 추가 대화상자 */}
      <AddDialog />
      {/* 게시물 수정 대화상자 */}
      <EditDialog />
      {/* 댓글 추가 대화상자 */}
      <AddCommentDialog />
      {/* 댓글 수정 대화상자 */}
      <EditCommentDialog />
      {/* 게시물 상세 보기 대화상자 */}
      <PostDetailDialog />
      {/* 사용자 모달 */}
      <UserDialog />
    </>
  )
}