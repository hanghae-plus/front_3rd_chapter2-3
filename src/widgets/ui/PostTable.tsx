import { Table, TableBody, TableHead, TableHeader, TableRow } from "../../shared/ui"
import { PostTableRow } from "../../features/post/ui/PostTableRow"
import { usePostFilter } from "../../features/post/model/usePostFilter"
import { usePostFilters } from "../../features/post/api/usePostFilters"
import { usePostStore } from "../../features/post/model/usePostStore"

export const PostTable = () => {
  const { skip, limit } = usePostFilter({})
  const { isLoading, error } = usePostFilters({ skip, limit })
  const storePosts = usePostStore((state) => state.posts)

  if (isLoading) return <div className="flex justify-center p-4">로딩 중...</div>
  if (error) return <div>에러 발생!</div>

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
        {storePosts.map((post) => (
          <PostTableRow key={post.id} post={post} />
        ))}
      </TableBody>
    </Table>
  )
}
