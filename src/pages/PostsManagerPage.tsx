import { Plus } from "lucide-react"
import { Button, Card, CardContent, CardHeader, CardTitle } from "../shared/ui"
import { URLParams } from "../shared/types"
import { useTag } from "../features/model/tag/useTag"
import { usePost } from "../features/model/post/usePost"
import { useURLParams } from "../features/model/url/useURLParams"
import { PostSearchInput } from "../widgets/ui/post/PostSearchInput"
import { PostTagSelect } from "../widgets/ui/post/PostTagSelect"
import { PostSortSelect } from "../widgets/ui/post/PostSortSelect"
import { PostTable } from "../widgets/ui/post/PostTable"
import { PostPagination } from "../widgets/ui/post/PostPagination"
import { PostAddDialog } from "../widgets/ui/post/PostAddDialog"
import { PostEditDialog } from "../widgets/ui/post/PostEditDialog"
import { PostDetailDialog } from "../widgets/ui/post/PostDetailDialog"
import { CommentAddDialog } from "../features/ui/comment/CommentAddDialog"
import { CommentEditDialog } from "../features/ui/comment/CommentEditDialog"
import { UserDetailDialog } from "../widgets/ui/user/UserDetailDialog"

const PostsManager = () => {
  const { tags } = useTag()
  const { handleSearchPosts, setShowAddDialog } = usePost()
  const { params, updateParams, updateURL } = useURLParams()
  const { search: searchQuery, sortBy, sortOrder, tag: selectedTag } = params as URLParams

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
          <div className="flex gap-4">
            <PostSearchInput value={searchQuery as string} onChange={updateParams} onSearch={handleSearchPosts} />
            <PostTagSelect
              value={selectedTag as string}
              tags={tags}
              onChange={(value) => {
                updateParams({ tag: value })
                updateURL()
              }}
            />
            <PostSortSelect
              sortBy={sortBy as string}
              sortOrder={sortOrder as string}
              onSortByChange={(value) => updateParams({ sortBy: value })}
              onSortOrderChange={(value) => updateParams({ sortOrder: value })}
            />
          </div>

          <PostTable />

          <PostPagination />
        </div>
      </CardContent>

      <PostAddDialog />
      <PostEditDialog />
      <PostDetailDialog />
      <CommentAddDialog />
      <CommentEditDialog />
      <UserDetailDialog />
    </Card>
  )
}

export default PostsManager
