import { Table, TableBody } from "../../../shared/ui"
import { PostTableHead } from "./PostTableHead"
import { usePostsContext } from "../../../features/post/model/PostContext"
import { PostItem } from "../../../features/post-item/ui/PostItem"

export const PostTable = () => {
  const { posts } = usePostsContext()

  return (
    <Table>
      <PostTableHead />

      <TableBody>
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </TableBody>
    </Table>
  )
}
