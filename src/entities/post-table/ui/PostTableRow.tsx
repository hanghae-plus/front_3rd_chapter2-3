import { TableCell, TableRow } from "../../../shared/ui/table"
import PostTitleCell from "./PostTitleCell"
import PostUserCell from "./PostUserCell"
import PostReactionCell from "./PostReactionCell"
import PostActionCell from "./PostActionCell"

interface Props {
  post: any
  highlightText: any
  searchQuery: any
  selectedTag: any
  setSelectedTag: any
  updateURL: any
  openPostDetail: any
  setSelectedPost: any
  setShowEditDialog: any
  deletePost: any
}

const PostTableRow = ({
  post,
  highlightText,
  searchQuery,
  selectedTag,
  setSelectedTag,
  updateURL,
  openPostDetail,
  setSelectedPost,
  setShowEditDialog,
  deletePost,
}: Props) => {
  return (
    <TableRow key={post.id}>
      <TableCell>{post.id}</TableCell>
      <PostTitleCell
        post={post}
        highlightText={highlightText}
        searchQuery={searchQuery}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        updateURL={updateURL}
      />
      <PostUserCell post={post} />
      <PostReactionCell post={post} />
      <PostActionCell
        post={post}
        setSelectedPost={setSelectedPost}
        setShowEditDialog={setShowEditDialog}
        openPostDetail={openPostDetail}
        deletePost={deletePost}
      />
    </TableRow>
  )
}

export default PostTableRow
