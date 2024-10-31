import { SearchBar } from '../../../features/search/ui/search-bar/SearchBar'
import { PostTable } from '@features/post/ui'
import { Pagination } from '@features/post/ui'

export const PostCardContent = () => {
  return (
    <div className="flex flex-col gap-4">
      <SearchBar />

      <PostTable />

      <Pagination />
    </div>
  )
}
