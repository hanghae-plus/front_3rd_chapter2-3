import { Table, TableBody } from "../../../shared/ui/table"
import PostTableHeader from "./PostTableHeader"
import PostTableRow from "./PostTableRow"

interface Props {
  posts: any
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

const PostTable = ({
  posts,
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
    <Table>
      <PostTableHeader />
      <TableBody>
        {posts.map((post: any) => (
          <PostTableRow
            key={post.id}
            post={post}
            highlightText={highlightText}
            searchQuery={searchQuery}
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
            updateURL={updateURL}
            openPostDetail={openPostDetail}
            setSelectedPost={setSelectedPost}
            setShowEditDialog={setShowEditDialog}
            deletePost={deletePost}
          />
        ))}
      </TableBody>
    </Table>
  )
}

export default PostTable
