import { Card } from "../shared/ui/card/Card"
import { PostHeader } from "../entities/ui/PostHeader"
import { PostContent } from "../entities/ui/PostContent"
import { DialogWrap } from "../feature/ui/DialogWrap"

const PostsManager = () => {
  return (
    <Card className="w-full max-w-6xl mx-auto">
      {/* 게시판 헤더 */}
      <PostHeader />

      {/* 게시판 테이블 */}
      <PostContent />

      {/* 각종 모달 */}
      <DialogWrap />
    </Card>
  )
}

export default PostsManager
