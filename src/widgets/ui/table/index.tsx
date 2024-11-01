import { usePost } from "../../../shared/hooks"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "../../../shared/ui/Table"
import PostTableRow from "./PostTableRow"

const PostTable = () => {
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
      <TableBody>{posts?.posts?.map((post) => <PostTableRow post={post} />)}</TableBody>
    </Table>
  )
}

export default PostTable
