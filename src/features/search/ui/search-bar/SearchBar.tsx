import { SearchInput } from './SearchInput'
import { SortBySelect } from './SortBySelect'
import { SortOrderSelect } from './SortOrderSelect'
import { TagSelect } from './TagSelect'

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
