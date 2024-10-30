import { useSearchPosts } from "@/features/post/api/use-search-post";

import { useNavigator } from "@/shared/model/useNavigator";

import { Input } from "@/shared/ui";

import { Search } from "lucide-react";

const SearchInput = () => {
  const {
    handleUpdateQuery,
    queries: { search },
  } = useNavigator();

  const { mutate: searchPosts, isPending } = useSearchPosts();

  return (
    <div className="flex-1">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="게시물 검색..."
          className="pl-8"
          value={search}
          onChange={(e) => handleUpdateQuery("search", e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchPosts(search)}
          disabled={isPending}
        />
      </div>
    </div>
  );
};

export default SearchInput;
