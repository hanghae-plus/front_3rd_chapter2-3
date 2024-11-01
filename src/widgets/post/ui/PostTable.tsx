import { Table, TableBody, TableHead, TableHeader, TableRow } from "../../../shared/ui"
import PostItem from "../../../features/post/ui/PostItem.tsx"
import { Post } from "../../../entities/post/model/types.ts"

interface Props {
  posts: Post[]
}

export default function PostTable({ posts }: Props) {
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
      <TableBody>{posts?.map((post) => <PostItem key={post.id} post={post} />)}</TableBody>
    </Table>
  )
}
