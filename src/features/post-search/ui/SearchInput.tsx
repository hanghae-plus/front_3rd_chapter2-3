import { Input } from "@/shared/ui";
import { Search } from "lucide-react";
import { useSearchDebounce } from "../model/useSearchDebounce";

const SearchInput = () => {
  const { search, handleSearch, handleKeyDown } = useSearchDebounce();

  return (
    <div className="flex-1">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="게시물 검색..."
          className="pl-8"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          onKeyDown={handleKeyDown(search)}
        />
      </div>
    </div>
  );
};

export default SearchInput;
