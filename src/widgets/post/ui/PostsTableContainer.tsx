import { PostPagination } from "@features/post/ui/pagenation"
import { useQueryPostList } from "@features/post/api/useQueryPostList"
import { PostSearchFilters } from "@features/post/ui/search/PostSearchFilters"
import { PostTotalTable } from "@widgets/post/ui/PostTotalTable"
import { Loading } from "@shared/ui/loading"
import { useUserCache } from "@features/user/api"

export const PostsTableContainer: React.FC = () => {
  const { posts, isLoading } = useQueryPostList()
  useUserCache()

  return (
    <div className="p-6 pt-0">
      <div className="flex flex-col gap-4">
        <PostSearchFilters />
        {isLoading ? <Loading /> : <PostTotalTable />}
        <PostPagination total={posts.total} />
      </div>
    </div>
  )
}