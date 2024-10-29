import usePostsStore from "@/features/post/models/usePostsStore";

import { useNavigator } from "@/shared/lib/useNavigator";

import { Input } from "@/shared/ui";

import { Search } from "lucide-react";
import { useShallow } from "zustand/shallow";

const SearchInput = () => {
  const {
    handleUpdateQuery,
    queries: { search, limit, skip },
  } = useNavigator();

  const { searchPosts, loading } = usePostsStore(
    useShallow((state) => ({
      searchPosts: state.searchPosts,
      loading: state.loading,
    })),
  );

  return (
    <div className="flex-1">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="게시물 검색..."
          className="pl-8"
          value={search}
          onChange={(e) => handleUpdateQuery("search", e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchPosts({ limit, skip, searchQuery: search })}
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default SearchInput;
