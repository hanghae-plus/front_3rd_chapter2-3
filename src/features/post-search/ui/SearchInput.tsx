import { useNavigator } from "@/shared/lib/useNavigator";
import { usePostContext } from "@/shared/model/PostContext";
import { Input } from "@/shared/ui";
import { Search } from "lucide-react";

const SearchInput = () => {
  const { loading, refetch } = usePostContext();
  const {
    handleUpdateQuery,
    queries: { search },
  } = useNavigator();

  return (
    <div className="flex-1">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="게시물 검색..."
          className="pl-8"
          value={search}
          onChange={(e) => handleUpdateQuery("search", e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && refetch()}
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default SearchInput;
