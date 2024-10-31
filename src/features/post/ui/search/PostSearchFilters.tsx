import { searchParamsAtom } from "@features/filter/model"
import { useSearchPost } from "@features/post/hooks/useSearchPost"
import { SearchParams } from "@features/filter/model"
import { SearchInput } from "@shared/ui/input/SearchInput"
import { SelectRoot } from "@shared/ui/select/SelectRoot"
import { useTags } from "@features/tag/hooks/useTags"
import { useAtom } from "jotai"
import { sortValue } from "@features/post/config/sortValue"


export const PostSearchFilters: React.FC = () => {
  const [searchParams, updateSearchParams] = useAtom(searchParamsAtom)
  const { search, setSearch } = useSearchPost(searchParams.searchQuery)
  const { tags } = useTags()

  const handleSearchPost = () => {
    updateSearchParams((prev: SearchParams) => ({ ...prev, searchQuery: search }))
  }

  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <SearchInput
          placeholder="게시물 검색..."
          initialValue={search}
          onChange={(v) => setSearch(v)}
          onEnter={handleSearchPost}
        />
      </div>

      <SelectRoot
        items={tags}
        placeholder="태그 선택"
        value={searchParams.selectedTag}
        onValueChange={(selectedTag) =>
          updateSearchParams((prev: SearchParams) => ({ ...prev, selectedTag }))
        }
      />
      <SelectRoot
        items={sortValue.options.by}
        placeholder="정렬 기준"
        value={searchParams.sortBy}
        onValueChange={(sortBy) =>
          updateSearchParams((prev: SearchParams) => ({ ...prev, sortBy }))
        }
      />
      <SelectRoot
        items={sortValue.options.order}
        placeholder="정렬 순서"
        value={searchParams.sortOrder}
        onValueChange={(sortOrder) =>
          updateSearchParams((prev: SearchParams) => ({ ...prev, sortOrder }))
        }
      />
    </div>
  )
}
