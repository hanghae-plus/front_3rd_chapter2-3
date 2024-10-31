import { SearchInput, SelectTag, SelectSortOrder } from "../../features/search/ui";

export function SearchBar() {
  return (
    <div className="flex gap-4">
      <SearchInput />
      <SelectTag />
      <SelectSortOrder />
    </div>
  );
}
