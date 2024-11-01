import { CreatePostDialog } from "@entities/post/ui/CreatePostDialog"
import { PostEditForm } from "@entities/post/ui/PostEditForm"
import { PostDetail } from "@entities/post/ui/PostDetail"
import { UserDetail } from "@entities/user/ui/UserDetail"
import { CreateComment } from "@entities/comment/ui/CreateComment"
import { EditComment } from "@entities/comment/ui/EditComment"

export const DialogWrap = () => {
  return (
    <>
      {/* 게시물 추가 팝업 */}
      <CreatePostDialog userId={1} />

      {/* 게시물 편집 팝업 */}
      <PostEditForm />

      {/* 게시물 상세 팝업 */}
      <PostDetail />

      {/* 유저 상세정보 팝업 */}
      <UserDetail />

      {/* 댓글 추가 */}
      <CreateComment />

      {/* 댓글 편집 */}
      <EditComment />
    </>
  )
}
