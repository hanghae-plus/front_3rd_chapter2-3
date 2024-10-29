import { Table, TableBody, TableHead, TableHeader, TableRow } from "../../../shared/ui/Table"
import PostRow from "./PostRow"

interface PostTableProps {
  posts: Post[]
  onEdit: (post: Post) => void
  onDelete: (postId: number) => void
  onDetail: (post: Post) => void
}

const PostTable: React.FC<PostTableProps> = ({ posts, onEdit, onDelete, onDetail }) => (
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
        <PostRow
          key={post.id}
          post={post}
          onEdit={onEdit}
          onDelete={onDelete}
          onDetail={onDetail}
        />
      ))}
    </TableBody>
  </Table>
)

export default PostTable