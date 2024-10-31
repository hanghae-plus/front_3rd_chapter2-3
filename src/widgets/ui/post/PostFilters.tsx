import { PostSearchInput } from "../../../features/ui/post/PostSearchInput"
import { PostTagSelect } from "../../../features/ui/post/PostTagSelect"
import { PostSortSelect } from "../../../features/ui/post/PostSortSelect"
import { useURLParams } from "../../../features/model/url/useURLParams"
import { usePost } from "../../../features/model/post/usePost"
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
