import { PostCreateDialog } from "../post/ui/PostCreateDialog"
import { PostUpdateDialog } from "../post/ui/PostUpdateDialog"
import { CommentCreateDialog } from "../comment/ui/CommentCreateDialog"
import { CommentUpdateDialog } from "../comment/ui/CommentUpdateDialog"
import { UserDialog } from "../../entities/ui/UserDialog"
import { PostDetailDialog } from "../post/ui/PostDetailDialog"

export const DialogWrap = () => {
  return (
    <>
      {/* 게시물 추가 대화상자 */}
      <PostCreateDialog />

      {/* 게시물 수정 대화상자 */}
      <PostUpdateDialog />

      {/* 댓글 추가 대화상자 */}
      <CommentCreateDialog />

      {/* 댓글 수정 대화상자 */}
      <CommentUpdateDialog />

      {/* 게시물 상세 보기 대화상자 */}
      <PostDetailDialog />

      {/* 사용자 모달 */}
      <UserDialog />
    </>
  )
}
