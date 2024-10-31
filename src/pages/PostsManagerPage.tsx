import { Card, CardContent, CardHeader, CardTitle } from "../shared/ui/card/ui"
import PostTable from "../widgets/post/ui/PostTable.tsx"
import { usePostStore } from "../entities/post/model/store.ts"
import usePostQueryParams from "./model/usePostURLParams.ts"
import PostAddButton from "../features/post-add/ui/PostAddButton.tsx"
import PostSearchItem from "../features/post-search/ui/PostSearchItem.tsx"
import PostPagination from "../features/post-pagination/ui/PostPagination.tsx"
import { useQueryPostsAndUsers } from "./api/useQueryPostsAndUsers.ts"

const PostsManager = () => {
  const { skip, limit, searchQuery, sortBy, sortOrder, selectedTag, setParam } = usePostQueryParams()
  const { posts, isLoading } = usePostStore((state) => state)
  useQueryPostsAndUsers(limit, skip, selectedTag)

  const postSearchParams = {
    searchQuery,
    sortBy,
    sortOrder,
    selectedTag,
    setParam,
  }

  const postPaginationParams = {
    skip,
    limit,
    setParam,
  }

  const postTableParams = {
    selectedTag,
    searchQuery,
    setParam,
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <PostAddButton />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <PostSearchItem {...postSearchParams} />
          {isLoading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostTable posts={posts} postTableParams={postTableParams} />
          )}
          <PostPagination {...postPaginationParams} />
        </div>
      </CardContent>
    </Card>
  )
}

export default PostsManager
