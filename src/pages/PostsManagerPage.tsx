import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { Button, Card, CardContent, CardHeader, CardTitle, SearchInput } from "../shared/ui"
import { PostDetailModal } from "../features/post-detail/ui/PostDetailModal"
import { UserModal } from "../features/user/ui/UserModal"
import { PostAddModal } from "../features/post-add/ui/PostAddModal"
import { PostTable } from "../widgets/post/ui/PostTable"
import { Pagination } from "../features/post-pagination/ui/Pagination"
import { TagSelect } from "../features/post-filter/ui/TagSelect"
import { SelectSortStandard } from "../features/post-sort/ui/SelectSortStandard"
import { SelectSortOrder } from "../features/post-sort/ui/SelectSortOrder"
import { PostEditModal } from "../features/post-edit/ui/PostEditModal"
import { usePostParamsStore } from "../features/post/model/postParamsStore"
import { usePostQueryStore } from "../features/post/model/postQueryStore"
import { usePostAddModalStore } from "../features/post/model/postAddModalStore"

const PostsManager = () => {
  const [searchQueryInput, setSearchQueryInput] = useState("")

  const { setShowAddDialog } = usePostAddModalStore()
  const {
    skip,
    limit,
    searchQuery,
    setSearchQuery,
    sortBy,
    sortOrder,
    selectedTag,

    updateURL,
  } = usePostParamsStore()
  const { setActiveQuery } = usePostQueryStore()

  // 게시물 검색
  const handleSearchPosts = () => {
    setActiveQuery("search")
    setSearchQuery(searchQueryInput)
  }

  useEffect(() => {
    updateURL()
  }, [skip, limit, sortBy, sortOrder, selectedTag, searchQuery])

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <div className="flex gap-4">
            <SearchInput
              value={searchQueryInput}
              placeholder="게시물 검색..."
              onChange={(e) => setSearchQueryInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearchPosts()}
            />
            <TagSelect />
            <SelectSortStandard />
            <SelectSortOrder />
          </div>

          {/* 게시물 테이블 */}
          <PostTable />

          <Pagination />
        </div>
      </CardContent>

      <PostAddModal />
      <PostEditModal />
      <PostDetailModal />

      <UserModal />
    </Card>
  )
}

export default PostsManager
