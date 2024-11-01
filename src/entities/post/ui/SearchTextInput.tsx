import { useSearchInput } from "@features/searchParams/hooks/useSearchInput"
import { SearchInput } from "@shared/ui/input/SearchInput"

export const SearchTextInput: React.FC = () => {
  const { searchInput, updateInputState, updateSearchInput } = useSearchInput()

  return (
    <SearchInput
      placeholder="게시물 검색..."
      initialValue={searchInput}
      onChange={updateInputState}
      onEnter={updateSearchInput}
    />
  )
}
