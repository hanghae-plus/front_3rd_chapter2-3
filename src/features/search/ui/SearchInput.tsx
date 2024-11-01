import { Search } from "lucide-react";
import { Input } from "../../../shared/ui";
import { useSearchFilterStore } from "../model/store/useSearchFilterStore";

export function SearchInput() {
  const { searchQuery, setSearchQuery } = useSearchFilterStore();

  const handleChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex-1">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="게시물 검색..." className="pl-8" value={searchQuery} onChange={handleChangeSearchInput} />
      </div>
    </div>
  );
}
