import { Card, CardContent } from "../shared/ui/index"
import { Pagination } from "../shared/ui/components/Pagination"
import { usePostStore } from "../features/Post/model/stores/usePostStore"
import { RenderPostTable } from "../features/Post/ui/renderPostTable"
import { SearchControl } from "../features/Search/ui/SearchControl"
import { PostManagerHeader } from "../features/Post/ui/PostManagerHeader"
import { DialogContainer } from "../features/Dialog/ui/DialogContainer"
import { useURLParams } from "../features/Post/model/hooks/url/useURLParams"
import { usePostData } from "../features/Post/model/hooks/data/usePostData"

const PostsManager = () => {
  const { loading } = usePostStore()

  useURLParams()
  usePostData()

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <PostManagerHeader />
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <SearchControl />

          {/* 게시물 테이블 */}
          {loading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <RenderPostTable />
          )}

          {/* 페이지네이션 */}
          <Pagination />
        </div>
      </CardContent>
      <DialogContainer />
    </Card>
  )
}

export default PostsManager
