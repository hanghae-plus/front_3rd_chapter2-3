import { TableBody } from "../../../shared/ui"
import { Post } from "../model/types"
import { PostTableBodyRow } from "../../../features/post/ui/PostTableBodyRow"

export const PostTableBody: React.FC<{
  posts: Post[]
  searchQuery: string
  selectedTag: string
  updateURL: () => void
  setSelectedTag: (tag: string) => void
  setSelectedPost: (post: Post) => void
  openUserModal: (userId: number) => void
  setShowEditDialog: (value: boolean) => void
  openPostDetail: (post: Post) => void
  deletePost: (postId: number) => void
}> = ({
  posts,
  searchQuery,
  selectedTag,
  updateURL,
  setSelectedTag,
  setSelectedPost,
  openUserModal,
  setShowEditDialog,
  openPostDetail,
  deletePost,
}) => {
  return (
    <TableBody>
      {posts.map((post) => (
        <PostTableBodyRow
          key={post.id}
          post={post}
          searchQuery={searchQuery}
          selectedTag={selectedTag}
          updateURL={updateURL}
          setSelectedTag={setSelectedTag}
          setSelectedPost={setSelectedPost}
          openUserModal={openUserModal}
          setShowEditDialog={setShowEditDialog}
          openPostDetail={openPostDetail}
          deletePost={deletePost}
        />
      ))}
    </TableBody>
  )
}
