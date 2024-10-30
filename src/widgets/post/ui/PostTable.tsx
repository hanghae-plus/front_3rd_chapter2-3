import { Table, TableHead, TableHeader, TableRow } from "../../../shared/ui/table/ui"
import { usePostsStore } from "../../../features/post/model/usePostsStore.ts"
import PostItem from "../../../features/post-item/ui/PostItem.tsx"

const PostTable = () => {
  const { posts } = usePostsStore((state) => state)

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
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </Table>
  )
}

export default PostTable
