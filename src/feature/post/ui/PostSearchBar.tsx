import { Search } from "lucide-react";
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/ui";
import { useGetPosts, useGetSearchPosts, usePost, useQueryParams } from "../model";
import { Post } from "../../../entities/post/model/types.ts";
import { User } from "../../../entities/user/model/types.ts";
import { useEffect } from "react";
import { PostSearchBarTagSelectBox } from "./PostSearchBarTagSelectBox.tsx";

export const PostSearchBar = () => {
  const { sortBy, sortOrder, setSortOrder, setSortBy, searchQuery, setSearchQuery, setPosts, setTotal } = usePost();

  const { queryParams } = useQueryParams();

  const { data: postsData } = useGetPosts(queryParams.limit, queryParams.skip, sortBy, sortOrder);
  const { data: searchData } = useGetSearchPosts(searchQuery);

  useEffect(() => {
    if (postsData) {
      const postsWithUsers = postsData.postsData.posts.map((post: Post) => ({
        ...post,
        author: postsData.usersData.users.find((user: User) => user.id === post.userId),
      }));

      setPosts(postsWithUsers);
      setTotal(postsData.postsData.total);
    }
  }, [postsData]);

  useEffect(() => {
    if (searchQuery && searchData) {
      setPosts(searchData.posts);
      setTotal(searchData.total);
    }
  }, [searchData, searchQuery]);

  const handleEnterKeyPress = () => {
    if (!searchQuery) {
      return;
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleEnterKeyPress()}
          />
        </div>
      </div>
      <PostSearchBarTagSelectBox />
      <Select value={sortBy} onValueChange={setSortBy}>
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
      <Select value={sortOrder} onValueChange={setSortOrder}>
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
