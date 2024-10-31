import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/ui";
import { useGetPosts, useGetSearchPosts, usePost, useQueryParams } from "../model";
import { PostSearchBarTagSelectBox } from "./PostSearchBarTagSelectBox.tsx";

export const PostSearchBar = () => {
  const [keyword, setKeyword] = useState<string>("");

  const { sortBy, sortOrder, setSortOrder, setSortBy, setSearchQuery, setPosts, setTotal, setLoading } = usePost();
  const { queryParams, setQueryParams } = useQueryParams();

  useEffect(() => {
    setSortBy(queryParams.sortBy);
    setSortOrder(queryParams.sortOrder);
    setSearchQuery(queryParams.searchQuery);
  }, [queryParams, setSortBy, setSortOrder, setSearchQuery]);

  const { data: postsData, isLoading: postDataLoading } = useGetPosts(queryParams.limit, queryParams.skip);
  const { data: searchData } = useGetSearchPosts(queryParams.searchQuery);

  useEffect(() => {
    setLoading(postDataLoading);
  }, [postDataLoading, setLoading]);

  useEffect(() => {
    if (postsData) {
      const postsWithUsers = postsData.postsData.posts.map((post) => ({
        ...post,
        author: postsData.usersData.users.find((user) => user.id === post.userId),
      }));

      setPosts(postsWithUsers);
      setTotal(postsData.postsData.total);
    }
  }, [postsData, setPosts, setTotal]);

  useEffect(() => {
    if (queryParams.searchQuery && searchData) {
      setPosts(searchData.posts);
      setTotal(searchData.total);
    }
  }, [searchData, queryParams.searchQuery, setPosts, setTotal]);

  const handleEnterKeyPress = () => {
    if (keyword) {
      setQueryParams({ searchQuery: keyword });
    }
  };

  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="게시물 검색..."
            className="pl-8"
            value={keyword || ""}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleEnterKeyPress()}
          />
        </div>
      </div>
      <PostSearchBarTagSelectBox />
      <Select
        value={sortBy}
        onValueChange={(value) => {
          setSortBy(value);
          setQueryParams({ sortBy: value });
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 기준" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">없음</SelectItem>
          <SelectItem value="id">ID</SelectItem>
          <SelectItem value="title">제목</SelectItem>
          <SelectItem value="reactions">반응</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={sortOrder}
        onValueChange={(value) => {
          setSortOrder(value);
          setQueryParams({ sortOrder: value });
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 순서" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">오름차순</SelectItem>
          <SelectItem value="desc">내림차순</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
