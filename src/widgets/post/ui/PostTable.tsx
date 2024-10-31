import { Loader, Table, TableBody, TableHead, TableHeader, TableRow } from "../../../shared/ui"
import { PostItem } from "../../../features/post-item/ui/PostItem"
import { useQueryPosts } from "../../../features/post/api/useQueryPosts"
import { useQueryUsers } from "../../../features/user/api/useQueryUsers"
import { usePostParamsStore } from "../../../features/post/model/postParamsStore"
import { useEffect } from "react"
import { usePostTotalStore } from "../../../features/post/model/postTotalStore"

export const PostTable = () => {
  const { skip, limit, sortBy, sortOrder, selectedTag, searchQuery, updateURL } = usePostParamsStore()

  useEffect(() => {
    updateURL()
  }, [skip, limit, sortBy, sortOrder, selectedTag, searchQuery])
  const { setTotal } = usePostTotalStore()

  const { data: usersDTO, isLoading: isLoadingUser } = useQueryUsers()
  const { data: posts, isLoading: isLoadingPosts } = useQueryPosts(usersDTO?.users || [], {
    skip,
    limit,
    sortBy,
    sortOrder,
    tag: selectedTag,
    searchQuery,
  })

  useEffect(() => {
    setTotal(posts?.length || 0)
  }, [posts, setTotal])

  if (isLoadingUser || isLoadingPosts) return <Loader />

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
