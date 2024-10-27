import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { Button, Card, CardContent, CardHeader, CardTitle, Loader, SearchInput } from "../shared/ui"
import { useTags } from "../entities/tag/model"
import { usePostParams } from "../features/post/model/usePostParams"
import { fetchUsersApi } from "../entities/user/api"
import { PostDetailModal } from "../features/post/ui/PostDetailModal"
import { UserModal } from "../widgets/user/ui/UserModal"
import { PostAddModal } from "../features/post/ui/PostAddModal"
import { PostEditModal } from "../features/post/ui/PostEditModal"
import { useUserContext } from "../shared/model/UserContext"
import { usePostsContext } from "../shared/model/PostContext"
import { PostTable } from "../features/post/ui/PostTable"
import { Pagination } from "../features/post/ui/Pagination"
import { SelectTag } from "../features/product-filter/ui/SelectTag"
import { SelectSortStandard } from "../features/product-sort/ui/SelectSortStandard"
import { SelectSortOrder } from "../features/product-sort/ui/SelectSortOrder"

const PostsManager = () => {
  const [loading, setLoading] = useState(false)

  const { tags, getTags } = useTags()
  const {
    setShowAddDialog,
    total,

    getPostsByTag,
    getSearchedPosts,
    getPosts,
  } = usePostsContext()
  const {
    skip,
    setSkip,
    limit,
    setLimit,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    selectedTag,
    setSelectedTag,

    updateURL,
  } = usePostParams()
  const { selectedUser } = useUserContext()

  // 게시물 가져오기
  const fetchPosts = async () => {
    setLoading(true)

    const data = await fetchUsersApi()
    getPosts(limit, skip, data.users)

    setLoading(false)
  }

  // 게시물 검색
  const searchPosts = async () => {
    if (!searchQuery) {
      fetchPosts()
      return
    }
    setLoading(true)
    getSearchedPosts(searchQuery)
    setLoading(false)
  }

  // 태그별 게시물 가져오기
  const handleGetPostsByTag = async (tag: string) => {
    if (!tag || tag === "all") {
      fetchPosts()
      return
    }
    setLoading(true)
    getPostsByTag(tag)
    setLoading(false)
  }

  useEffect(() => {
    getTags()
  }, [])

  useEffect(() => {
    if (selectedTag) {
      handleGetPostsByTag(selectedTag)
    } else {
      fetchPosts()
    }
    updateURL()
  }, [skip, limit, sortBy, sortOrder, selectedTag])

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
              value={searchQuery}
              placeholder="게시물 검색..."
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && searchPosts()}
            />

            <SelectTag
              selectedTag={selectedTag}
              setSelectedTag={setSelectedTag}
              handleGetPostsByTag={handleGetPostsByTag}
              updateURL={updateURL}
              tags={tags}
            />
            <SelectSortStandard sortBy={sortBy} setSortBy={setSortBy} />
            <SelectSortOrder sortOrder={sortOrder} setSortOrder={setSortOrder} />
          </div>

          {/* 게시물 테이블 */}
          {loading ? (
            <Loader />
          ) : (
            <PostTable
              searchQuery={searchQuery}
              selectedTag={selectedTag}
              setSelectedTag={setSelectedTag}
              updateURL={updateURL}
            />
          )}

          <Pagination limit={limit} setLimit={setLimit} skip={skip} setSkip={setSkip} total={total} />
        </div>
      </CardContent>

      <PostAddModal />
      <PostEditModal />
      <PostDetailModal searchQuery={searchQuery} />

      <UserModal selectedUser={selectedUser!} />
    </Card>
  )
}

export default PostsManager
