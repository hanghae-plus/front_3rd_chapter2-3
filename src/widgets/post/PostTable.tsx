import { Post } from "../../entities/post/model/type"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "../../shared/ui"
import { PostTableRow } from "./PostTableRow"

export const PostTable = ({ posts }: { posts: Post[] }) => (
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
      {posts.map((post: Post) => (
        <PostTableRow key={post.id} post={post} />
      ))}
    </TableBody>
  </Table>
)
