import { Pagination } from "../../../widgets/ui/Pagination"
import { PostTable } from "../../../widgets/ui/PostTable"
import { PostFilterSearchQuery } from "./PostFilterSearchQuery"
import { PostFilterSortBy } from "./PostFilterSortBy"
import { PostFilterSortOrder } from "./PostFilterSortOrder"
import { PostFilterTag } from "./PostFilterTag"

export const PostContent = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* 검색 및 필터 컨트롤 */}
      <div className="flex gap-4">
        <PostFilterSearchQuery />
        <PostFilterTag />
        <PostFilterSortBy />
        <PostFilterSortOrder />
      </div>

      {/* 게시물 테이블 */}
      <PostTable />

      {/* 페이지네이션 */}
      <Pagination />
    </div>
  )
}
