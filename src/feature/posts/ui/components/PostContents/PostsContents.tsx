import { CardContent } from "../../../../../shared"
import { Post } from "../../../model"
import { Pagination } from "../Controls"
import { PostFilters } from "../PostFilters"
import { PostTable } from "../PostTable"

interface PostsContentProps {
  posts: Post[]
  searchQuery: string
  selectedTag: string
  sortBy: string
  sortOrder: string
  pagination: {
    total: number
    limit: number
    skip: number
    setSkip: (skip: number) => void
    setLimit: (limit: number) => void
  }
  onSearchChange: (query: string) => void
  onTagChange: (tag: string) => void
  onSortByChange: (sort: string) => void
  onSortOrderChange: (order: string) => void
  onPostDetail: (post: Post) => void
  onPostEdit: (post: Post) => void
  onUserClick: (id: number) => void
}

export const PostsContent = ({
  posts,
  searchQuery,
  selectedTag,
  sortBy,
  sortOrder,
  pagination: { total, limit, skip, setSkip, setLimit },
  onSearchChange,
  onTagChange,
  onSortByChange,
  onSortOrderChange,
  onPostDetail,
  onPostEdit,
  onUserClick,
}: PostsContentProps) => {
  return (
    <CardContent>
      <div className="flex flex-col gap-4">
        <PostFilters
          searchQuery={searchQuery}
          selectedTag={selectedTag}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSearchChange={onSearchChange}
          onTagChange={onTagChange}
          onSortByChange={onSortByChange}
          onSortOrderChange={onSortOrderChange}
        />
        <PostTable
          posts={posts}
          searchQuery={searchQuery}
          selectedTag={selectedTag}
          onPostDetail={onPostDetail}
          onPostEdit={onPostEdit}
          onUserClick={onUserClick}
        />
        <Pagination
          total={total}
          limit={limit}
          skip={skip}
          setSkip={setSkip}
          setLimit={setLimit}
        />
      </div>
    </CardContent>
  )
}
