import { Table, TableBody, TableHead, TableHeader, TableRow } from "../../shared/ui"
import { usePost } from "../../features/post/model/usePost"
import { PostTableRow } from "./PostTableRow"

export function PostTable() {
  const { posts } = usePost()

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
        {posts.map((post, index) => (
          <PostTableRow key={index} post={post} />
        ))}
      </TableBody>
    </Table>
  )
}
