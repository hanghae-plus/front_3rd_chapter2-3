import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/ui";
import { useNavigate } from "react-router-dom";
import { usePostContext } from "../model/PostContext.tsx";
import { useEffect } from "react";

export const PostPagination = () => {
  const navigate = useNavigate();

  const {
    skip,
    limit,
    setLimit,
    setSkip,
    searchQuery,
    sortBy,
    sortOrder,
    selectedTag,
    setSelectedTag,
    setSearchQuery,
    setSortBy,
    setSortOrder,
    total,
  } = usePostContext();

  // const updateURL = () => {
  //   const params = new URLSearchParams();
  //   if (skip) params.set("skip", skip.toString());
  //   if (limit) params.set("limit", limit.toString());
  //   if (searchQuery) params.set("search", searchQuery);
  //   if (sortBy) params.set("sortBy", sortBy);
  //   if (sortOrder) params.set("sortOrder", sortOrder);
  //   if (selectedTag) params.set("tag", selectedTag);
  //   navigate(`?${params.toString()}`);
  // };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSkip(parseInt(params.get("skip") || "0"));
    setLimit(parseInt(params.get("limit") || "10"));
    setSearchQuery(params.get("search") || "");
    setSortBy(params.get("sortBy") || "");
    setSortOrder(params.get("sortOrder") || "asc");
    setSelectedTag(params.get("tag") || "");
  }, [location.search]);
  //
  // useEffect(() => {
  //   if (selectedTag) {
  //     // fetchPostsByTag(selectedTag);
  //   } else {
  //     // fetchPosts();
  //   }
  //   updateURL();
  // }, [skip, limit, sortBy, sortOrder, selectedTag]);

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span>표시</span>
        <Select value={limit.toString()} onValueChange={(value) => setLimit(Number(value))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="30">30</SelectItem>
          </SelectContent>
        </Select>
        <span>항목</span>
      </div>
      <div className="flex gap-2">
        <Button disabled={skip === 0} onClick={() => setSkip(Math.max(0, skip - limit))}>
          이전
        </Button>
        <Button disabled={skip + limit >= total} onClick={() => setSkip(skip + limit)}>
          다음
        </Button>
      </div>
    </div>
  );
};
