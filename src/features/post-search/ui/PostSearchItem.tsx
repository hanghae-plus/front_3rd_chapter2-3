import SearchInput from "./SearchInput.tsx"
import TagSelect from "./TagSelect.tsx"
import SortBySelect from "./SortBySelect.tsx"
import SortOrderSelect from "./SortOrderSelect.tsx"
import { ParamValue } from "../model/types.ts"

interface Props {
  searchQuery: string
  sortBy: string
  sortOrder: string
  selectedTag: string
  setParam: (key: "searchQuery" | "sortBy" | "sortOrder" | "selectedTag", value?: ParamValue) => void
}

const PostSearchItem = ({ setParam, searchQuery, sortBy, sortOrder, selectedTag }: Props) => {
  return (
    <div className="flex gap-4">
      <SearchInput searchQuery={searchQuery} setParam={setParam} />
      <TagSelect selectedTag={selectedTag} setParam={setParam} />
      <SortBySelect sortBy={sortBy} setParam={setParam} />
      <SortOrderSelect sortOrder={sortOrder} setParam={setParam} />
    </div>
  )
}

export default PostSearchItem
