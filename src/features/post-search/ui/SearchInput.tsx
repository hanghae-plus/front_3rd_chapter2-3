import { usePostContext } from "@/entities/post/model/PostContext";

import { useNavigator } from "@/shared/lib/useNavigator";

import { Input } from "@/shared/ui";

import { Search } from "lucide-react";

const SearchInput = () => {
  const {
    handleUpdateQuery,
    queries: { search, limit, skip },
  } = useNavigator();

  const { actions, loading } = usePostContext();

  return (
    <div className="flex-1">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="게시물 검색..."
          className="pl-8"
          value={search}
          onChange={(e) => handleUpdateQuery("search", e.target.value)}
          onKeyDown={async (e) =>
            e.key === "Enter" && (await actions.searchPosts({ limit, skip, searchQuery: search }))
          }
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default SearchInput;
