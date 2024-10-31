import { TableCell, TableRow } from "../../../shared/ui/table/ui"
import { Post } from "../../../entities/post/model/types.ts"
import { highlightText } from "../../../shared/lib/highlightText.tsx"
import usePostURLParams from "../../post/model/usePostURLParams.ts"
import PostTableTagCell from "../../post-tag-select/ui/PostTableTagCell.tsx"
import PostAuthorUser from "../../post-author-user/ui/PostAuthorUser.tsx"
import PostReactionsItem from "../../../entities/post/ui/PostReactionsItem.tsx"
import PostDetailButton from "../../post-detail/ui/PostDetailButton.tsx"
import PostEditButton from "../../post-edit/ui/PostEditButton.tsx"
import PostDeleteButton from "../../post-delete/ui/PostDeleteButton.tsx"

interface Props {
  post: Post
}

const PostItem = ({ post }: Props) => {
  const { searchQuery } = usePostURLParams()

  return (
    <TableRow>
      <TableCell>{post.id}</TableCell>
      <TableCell>
        <div className="space-y-1">
          <div>{highlightText(post.title, searchQuery)}</div>
        </div>
        <PostTableTagCell tags={post.tags} />
      </TableCell>
      <TableCell>
        <PostAuthorUser post={post} />
      </TableCell>
      <TableCell>
        <PostReactionsItem reactions={post.reactions} />
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <PostDetailButton post={post} />
          <PostEditButton post={post} />
          <PostDeleteButton post={post} />
        </div>
      </TableCell>
    </TableRow>
  )
}

export default PostItem
