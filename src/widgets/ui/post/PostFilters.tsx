import { PostSearchInput } from "./PostSearchInput"
import { PostTagSelect } from "./PostTagSelect"
import { PostSortSelect } from "./PostSortSelect"
import { useURLParams } from "../../../shared/model/useURLParams"
import { usePost } from "../../../shared/model/usePost"
import { useTag } from "../../../features/model/tag/useTag"

export const PostFilters = () => {
  const { params, updateParams, updateURL } = useURLParams()
  const { handleSearchPosts } = usePost()
  const { tags } = useTag()
  const { search: searchQuery, sortBy, sortOrder, tag: selectedTag } = params

  return (
    <div className="flex gap-4">
      <PostSearchInput value={searchQuery as string} onChange={updateParams} onSearch={handleSearchPosts} />
      <PostTagSelect
        value={selectedTag as string}
        tags={tags}
        onChange={(value) => {
          updateParams({ tag: value })
          updateURL()
        }}
      />
      <PostSortSelect
        sortBy={sortBy as string}
        sortOrder={sortOrder as string}
        onSortByChange={(value) => updateParams({ sortBy: value })}
        onSortOrderChange={(value) => updateParams({ sortOrder: value })}
      />
    </div>
  )
}
