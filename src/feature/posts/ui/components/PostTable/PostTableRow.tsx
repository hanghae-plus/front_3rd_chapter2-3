import { TableCell, TableRow } from "../../../../../shared"
import highlightText from "../../../../../shared/lib/helper/highlight-text"
import { UserAvatar } from "../../../../users/ui/components/UserAvatar/UserAvatar"
import { Post } from "../../../model/types"
import { PostActions } from "../PostActions/PostActions"
import { PostReactionsContainer } from "../PostReaction/PostReactionContainer"
import { PostTags } from "../Tags/PostTags"

export const PostTableRow = ({
  post,
  searchQuery,
  selectedTag,
  onPostDetail,
  onPostEdit,
  onUserClick,
}: {
  post: Post
  searchQuery: string
  selectedTag: string
  onPostDetail: (post: Post) => void
  onPostEdit: (post: Post) => void
  onUserClick: (id: number) => void
}) => {
  return (
    <TableRow>
      <TableCell>{post.id}</TableCell>
      <TableCell>
        <div className="space-y-1">
          <div>{highlightText(post.title, searchQuery)}</div>
          <PostTags tags={post.tags} selectedTag={selectedTag} />
        </div>
      </TableCell>
      <TableCell>
        <UserAvatar
          user={post.userId}
          onClick={() => onUserClick(post.userId)}
        />
      </TableCell>
      <TableCell>
        <PostReactionsContainer post={post} />
      </TableCell>
      <TableCell>
        <PostActions
          post={post}
          onDetail={onPostDetail}
          onEdit={onPostEdit}
        />
      </TableCell>
    </TableRow>
  )
}
