import { Button, CardContent, CardHeader, CardTitle } from "../../../shared/ui"
import { Plus } from "lucide-react"
import PostSearchFilter from "./PostSearchFilter.tsx"
import PostTable from "../../../widgets/post/ui/PostTable.tsx"
import PostPagination from "./PostPagination.tsx"
import { usePostDialog } from "../model/usePostDialog.ts"
import { useUsersQuery } from "../../user/api/useUsersQuery.ts"
import { usePostsQuery } from "../api/queries.ts"
import { createPosts } from "../../../entities/post/model"

export default function PostManagement() {
  const { setShowAddDialog } = usePostDialog()
  const { data: usersData } = useUsersQuery()
  const { data: postsData, isLoading } = usePostsQuery()

  const posts = postsData?.posts && createPosts(postsData.posts, usersData)

  return (
    <>
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
          <PostSearchFilter />
          {!posts || isLoading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostTable posts={posts} />
          )}
        </div>
        {postsData?.total && <PostPagination postTotal={postsData.total || 0} />}
      </CardContent>
    </>
  )
}
