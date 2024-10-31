import { SearchInput, TagSelect } from '@features/search/ui'
import { SortBySelect } from '@features/search/ui/SortBySelect'
import { SortOrderSelect } from '@features/search/ui/SortOrderSelect'

export const SearchBar = () => {
  return (
    <div className="flex gap-4">
      <SearchInput />

      <TagSelect />

      <SortBySelect />

      <SortOrderSelect />
    </div>
  )
}
