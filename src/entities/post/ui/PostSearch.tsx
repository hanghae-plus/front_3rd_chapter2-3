import { useSearchSortOrder } from "@features/searchParams/hooks/useSearchSortOrder"
import { SORT_BY_LIST, SORT_ORDER_LIST } from "@features/searchParams/constants"
import { useSearchSortBy } from "@features/searchParams/hooks/useSearchSortBy"
import { useSearchTag } from "@features/searchParams/hooks/useSearchTag"
import { SelectRoot } from "@shared/ui/select/SelectRoot"
import { useTags } from "@entities/tag/hooks/useTags"
import { SearchTextInput } from "./SearchTextInput"

export const PostSearch: React.FC = () => {
  const { sortOrder, updateSearchSortOrder } = useSearchSortOrder()
  const { sortBy, updateSearchSortBy } = useSearchSortBy()
  const { searchTag, updateSearchTag } = useSearchTag()

  const { tags } = useTags()

  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <SearchTextInput />
      </div>

      <SelectRoot
        items={tags}
        placeholder="태그 선택"
        value={searchTag}
        onValueChange={updateSearchTag}
      />
      <SelectRoot
        items={SORT_BY_LIST}
        placeholder="정렬 기준"
        value={sortBy}
        onValueChange={updateSearchSortBy}
      />
      <SelectRoot
        items={SORT_ORDER_LIST}
        placeholder="정렬 순서"
        value={sortOrder}
        onValueChange={updateSearchSortOrder}
      />
    </div>
  )
}
