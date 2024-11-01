import { useState } from "react"
import { usePostQueryParams, usePostsQuery } from "../entities/post"
import { Card, CardContent, CardHeader, CardTitle } from "../shared/ui"
import { PostAddDialogButton, PostFilterBar, PostTable } from "../widgets/post"
import { Pagination } from "../widgets/ui/Pagination"

const PostsManager = () => {
  const {
    queryParams: { limit, search, skip, sortBy, sortOrder, tag: selectedTag },
    updateQueryParam: updateQueryParam,
  } = usePostQueryParams()

  const [searchQuery, setSearchQuery] = useState(search)

  const {
    data: { posts, total },
    isLoading,
  } = usePostsQuery({
    limit,
    skip,
    search: searchQuery,
    selectedTag,
    sortBy,
    sortOrder,
  })

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>

          {/* 게시물 추가 대화상자 버튼*/}
          <PostAddDialogButton />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <PostFilterBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedTag={selectedTag}
            sortBy={sortBy}
            sortOrder={sortOrder}
            updateQueryParam={updateQueryParam}
          />

          {/* 게시물 테이블 */}
          {isLoading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostTable
              posts={posts}
              searchQuery={searchQuery}
              selectedTag={selectedTag}
              updateQueryParam={updateQueryParam}
            />
          )}

          <Pagination
            limit={limit}
            skip={skip}
            total={total}
            updateQueryParam={updateQueryParam}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default PostsManager
