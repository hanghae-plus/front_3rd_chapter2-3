import { Table, TableBody, TableHead, TableHeader, TableRow } from "../../../shared/ui"
import { PostTableRow } from "./PostTableRow"
import { useRouterQueries } from "../../../features/post/model/routerStore"
import { usePostsQuery } from "../../../features/post/model/postStore"
import { PostIsLoading } from "./PostIsLoading"

export const PostTable = () => {
  const { skip, limit, sortBy, sortOrder, selectedTag, searchQuery } = useRouterQueries()
  const { data: postsData, isLoading } = usePostsQuery({
    skip,
    limit,
    searchQuery,
    sortBy,
    sortOrder,
    selectedTag,
  })
  return (
    <>
      {isLoading ? (
        <PostIsLoading />
      ) : (
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
          <TableBody>{postsData?.posts.map((post) => <PostTableRow key={post.id} post={post} />)}</TableBody>
        </Table>
      )}
    </>
  )
}
