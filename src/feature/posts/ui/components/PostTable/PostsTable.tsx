import { PostTableHeader } from "../../../../../entities/post/ui/components/PostsTable/PostTableHeader"
import {
  Table,
  TableBody,
} from "../../../../../shared"
import { Post } from "../../../model/types"
import { PostTableRow } from "./PostTableRow"

export const PostTable = ({
  posts,
  searchQuery,
  selectedTag,
  onPostDetail,
  onPostEdit,
  onUserClick,
}: {
  posts: Post[]
  searchQuery: string
  selectedTag: string
  onPostDetail: (post: Post) => void
  onPostEdit: (post: Post) => void
  onUserClick: (id: number) => void
}) => {

  return (
    <Table>
      <PostTableHeader />
      <TableBody>
        {posts?.map((post) => (
          <PostTableRow
            key={post.id}
            post={post}
            searchQuery={searchQuery}
            selectedTag={selectedTag}
            onPostDetail={onPostDetail}
            onPostEdit={onPostEdit}
            onUserClick={onUserClick}
          />
        ))}
      </TableBody>
    </Table>
  )
}
