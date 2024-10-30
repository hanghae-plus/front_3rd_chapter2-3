import { Search } from "lucide-react";
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/ui";
import { usePostContext } from "../model/PostContext.tsx";
import { useQueryParams } from "../model";
import { getPosts, getPostsByTag, getSearchPosts } from "../../../entities/post/api";
import { Post } from "../../../entities/post/model/types.ts";
import { User } from "../../../entities/user/model/types.ts";
import { useEffect } from "react";

export const PostSearchBar = () => {
  const {
    selectedTag,
    tags,
    setSelectedTag,
    sortBy,
    sortOrder,
    setSortOrder,
    setSortBy,
    searchQuery,
    setSearchQuery,
    setPosts,
    setTotal,
    setLoading,
  } = usePostContext();

  const { setQueryParams, queryParams } = useQueryParams();

  const fetchPostsByTag = async (tag: string) => {
    if (!tag || tag === "all") {
      await fetchPosts();
      return;
    }

    setLoading(true);

    const data = await getPostsByTag(tag);

    if (data) {
      const { postsData, usersData } = data;

      const postsWithUsers = postsData.posts.map((post: Post) => ({
        ...post,
        author: usersData.users.find((user: User) => user.id === post.userId),
      }));

      setPosts(postsWithUsers);
      setTotal(postsData.total);
    }

    setLoading(false);
  };

  const fetchPosts = async () => {
    setLoading(true);

    const response = await getPosts(queryParams.limit, queryParams.skip);

    if (response) {
      const { postsData, usersData } = response;

      const postsWithUsers = postsData.posts.map((post: Post) => ({
        ...post,
        author: usersData.users.find((user: User) => user.id === post.userId),
      }));

      setPosts(postsWithUsers);
      setTotal(postsData.total);
    }

    setLoading(false);
  };

  const handleEnterKeyPress = async () => {
    if (!queryParams.searchQuery) {
      fetchPosts();
      return;
    }

    setLoading(true);

    const data = await getSearchPosts(queryParams.searchQuery);

    if (data) {
      setPosts(data.posts);
      setTotal(data.total);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (queryParams.selectedTag) {
      fetchPostsByTag(queryParams.selectedTag);
    } else {
      fetchPosts();
    }
  }, [queryParams.skip, queryParams.limit, queryParams.sortBy, queryParams.sortOrder, queryParams.selectedTag]);

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
            onKeyPress={(e) => e.key === "Enter" && handleEnterKeyPress()}
          />
        </div>
      </div>
      <Select
        value={selectedTag}
        onValueChange={(value) => {
          setSelectedTag(value);
          fetchPostsByTag(value);
          setQueryParams({ selectedTag: value });
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="태그 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">모든 태그</SelectItem>
          {tags.map((tag) => (
            <SelectItem key={tag.url} value={tag.slug}>
              {tag.slug}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
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
