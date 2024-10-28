import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { Button, Card, CardContent, CardHeader, CardTitle, Loader, SearchInput } from "../shared/ui"
import { fetchUsersApi } from "../entities/user/api"
import { PostDetailModal } from "../features/post-detail/ui/PostDetailModal"
import { UserModal } from "../features/user/ui/UserModal"
import { PostAddModal } from "../features/post-add/ui/PostAddModal"
import { usePostsContext } from "../entities/post/model/PostContext"
import { PostTable } from "../features/post-view/ui/PostTable"
import { Pagination } from "../features/post-view/ui/Pagination"
import { SelectTag } from "../features/tag-select/ui/TagSelect"
import { SelectSortStandard } from "../features/post-sort/ui/SelectSortStandard"
import { SelectSortOrder } from "../features/post-sort/ui/SelectSortOrder"
import { PostEditModal } from "../features/post-edit/ui/PostEditModal"
import { usePostParamsContext } from "../entities/post/model/PostParamsContext"

const PostsManager = () => {
  const [loading, setLoading] = useState(false)

  const {
    setShowAddDialog,
    total,

    getPostsByTag,
    getSearchedPosts,
    getPosts,
  } = usePostsContext()
  const {
    skip,
    limit,
    searchQuery,
    setSearchQuery,
    sortBy,
    sortOrder,
    selectedTag,

    updateURL,
  } = usePostParamsContext()

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
    await getPostsByTag(tag, limit, skip)
    setLoading(false)
  }

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

            <SelectTag handleGetPostsByTag={handleGetPostsByTag} />
            <SelectSortStandard />
            <SelectSortOrder />
          </div>

          {/* 게시물 테이블 */}
          {loading ? <Loader /> : <PostTable />}

          <Pagination total={total} />
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
