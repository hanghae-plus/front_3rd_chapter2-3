import PostDetailDialog from "../../../entities/posts/ui/PostDetailDialog"
import CommentsAddDialog from "../../../features/comments/components/CommentsAddDialog"
import CommentsEditDialog from "../../../features/comments/components/CommentsEditDialog"
import PostAddDialog from "../../../features/posts/components/PostDialog/PostAddDialog"
import PostEditDialog from "../../../features/posts/components/PostDialog/PostEditDialog"
import UserModalDialog from "../../../features/users/components/UserModalDialog"

const Modal = () => {
  return (
    <div>
      {/* 게시물 추가 대화상자 */}
      <PostAddDialog />
      {/* 게시물 수정 대화상자 */}
      <PostEditDialog />
      {/* 댓글 추가 대화상자 */}
      <CommentsAddDialog />
      {/* 댓글 수정 대화상자 */}
      <CommentsEditDialog />
      {/* 게시물 상세 보기 대화상자 */}
      <PostDetailDialog />
      {/* 사용자 모달 */}
      <UserModalDialog />
    </div>
  )
}

export default Modal
