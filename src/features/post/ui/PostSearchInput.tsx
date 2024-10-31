import { useQueryParams } from "@/shared/model";
import { Input } from "@/shared/ui";
import { Search } from "lucide-react";
import { useCallback, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const PostSearchInput = () => {
  const [search, setSearch] = useState("");
  const { handleUpdateQuery } = useQueryParams();

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const debouncedSearch = useDebouncedCallback((value) => {
    handleUpdateQuery("search", value);
  }, 500);

  const handleKeyDown = useCallback(
    (value: string) => (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        debouncedSearch(value);
      }
    },
    [debouncedSearch],
  );

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

export default PostSearchInput;
