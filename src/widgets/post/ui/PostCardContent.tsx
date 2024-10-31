import { SearchBar } from './SearchBar'
import { PostTable } from '@features/post/ui/PostTable'
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
