import { PostsGridWrap } from "@entities/post/ui/PostsGridWrap"
import { useUserCache } from "@entities/user/hooks/useUserCache"
import { DialogWrap } from "@features/dialog/ui/DialogWrap"
import { PostsHeader } from "@entities/post/ui/PostsHeader"
import { PostsWrap } from "@shared/ui"

const PostsManager = () => {
  useUserCache()

  return (
    <PostsWrap className="w-full max-w-6xl mx-auto">
      {/* 게시판 헤더 */}
      <PostsHeader />

      {/* 게시판 GRID 보드 */}
      <PostsGridWrap />

      {/* 팝업 리스트 */}
      <DialogWrap />
    </PostsWrap>
  )
}

export default PostsManager
