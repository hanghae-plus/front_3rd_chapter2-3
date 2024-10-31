import { Table, TableHead, TableHeader, TableRow } from "../../../shared/ui/table/ui"
import PostItem from "../../../features/post-item/ui/PostItem.tsx"
import { Post } from "../../../entities/post/model/types.ts"

interface Props {
  posts: Post[]
  postTableParams: {
    selectedTag: string
    searchQuery: string
    setParam: (key: "searchQuery" | "selectedTag", value?: string | number) => void
  }
}

const PostTable = ({ posts, postTableParams }: Props) => {
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
        <PostItem key={post.id} post={post} {...postTableParams} />
      ))}
    </Table>
  )
}

export default PostTable
