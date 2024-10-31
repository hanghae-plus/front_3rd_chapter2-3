import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../../shared"
import { User } from "../../../../users/model/types"
import { Post } from "../../../model/types"
import { PostTableRow } from "./PostTableRow"

export const PostTable = ({
  posts,
  searchQuery,
  selectedTag,
  onPostDetail,
  onPostEdit,
  onPostDelete,
  onUserClick,
}: {
  posts: Post[]
  searchQuery: string
  selectedTag: string
  onPostDetail: (post: Post) => void
  onPostEdit: (post: Post) => void
  onPostDelete: (id: number) => void
  onUserClick: (author: User) => void
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
        {posts?.map((post) => (
          <PostTableRow
            key={post.id}
            post={post}
            searchQuery={searchQuery}
            selectedTag={selectedTag}
            onPostDetail={onPostDetail}
            onPostEdit={onPostEdit}
            onPostDelete={onPostDelete}
            onUserClick={onUserClick}
          />
        ))}
      </TableBody>
    </Table>
  )
}
