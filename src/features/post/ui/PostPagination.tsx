import { Pagination } from "../../page/ui/Pagination"
import { usePostsQuery } from "../model/postStore"
import { useRouterQueries } from "../model/routerStore"

export const PostPagination = () => {
  const { skip, limit, searchQuery, sortBy, sortOrder, selectedTag } = useRouterQueries()
  const { data: postsData } = usePostsQuery({
    skip,
    limit,
    searchQuery,
    sortBy,
    sortOrder,
    selectedTag,
  })

  return (
    <>
      <Pagination total={postsData?.total ?? 0} />
    </>
  )
}
