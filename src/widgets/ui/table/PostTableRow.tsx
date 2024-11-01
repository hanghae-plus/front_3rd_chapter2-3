import { Post } from "../../../entities/posts/model/Post"
import PostReactions from "../../../entities/posts/ui/PostReactions"
import { TableCell, TableRow } from "../../../shared/ui"
import PostTableAuthor from "../../../features/posts/components/PostTable/PostTableAuthor"
import PostTableEvents from "../../../features/posts/components/PostTable/PostTableEvents"
import PostTableTitle from "../../../features/posts/components/PostTable/PostTableTitle"

interface PostTableRowProps {
  post: Post
}

const PostTableRow = ({ post }: PostTableRowProps) => {
  return (
    <>
      <TableRow key={post.id}>
        <TableCell>{post.id}</TableCell>
        <TableCell>
          {/* 게시물 제목*/}
          <PostTableTitle post={post} />
        </TableCell>
        <TableCell>
          {/* 게시물 작성자 */}
          <PostTableAuthor post={post} />
        </TableCell>
        <TableCell>
          {/* 게시물 반응 */}
          <PostReactions post={post} />
        </TableCell>
        <TableCell>
          {/* 게시물 이벤트, 댓글, 수정, 삭제 */}
          <PostTableEvents post={post} />
        </TableCell>
      </TableRow>
    </>
  )
}

export default PostTableRow
