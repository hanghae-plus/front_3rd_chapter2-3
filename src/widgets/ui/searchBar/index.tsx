import { Search } from "lucide-react"
import PostSearchInput from "../../../features/posts/components/PostSearch/PostSearchInput"
import PostSearchTagSelect from "../../../features/posts/components/PostSearch/PostSearchTagSelect"
import PostSearchSortSelect from "../../../features/posts/components/PostSearch/PostSearchSortSelect"

const PostSearchBar = () => {
  return (
    <div>
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            {/* 게시물 검색 input */}
            <PostSearchInput />
          </div>
        </div>
        {/* 게시물 검색의 태그 선택 */}
        <PostSearchTagSelect />
        {/*게시물 검색의 정렬 선택   */}
        <PostSearchSortSelect />
      </div>
    </div>
  )
}

export default PostSearchBar
