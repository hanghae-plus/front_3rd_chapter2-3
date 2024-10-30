import { Post } from "../../../entities/post/model/types"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "../../../shared/ui"
import { PostTableRow } from "./PostTableRow"

export const PostTable: React.FC<{
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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">ID</TableHead>
          <TableHead>제목</TableHead>
          <TableHead className="w-[150px]">작성자</TableHead>
          <TableHead className="w-[150px]">반응</TableHead>
          <TableHead className="w-[150px]">작업</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <PostTableRow
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
    </Table>
  )
}
