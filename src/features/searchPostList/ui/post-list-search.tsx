import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui";
import { Search } from "lucide-react";
import { useSearchQuery } from "../model/use-search-query";
import { tagListState } from "@/entities/tag/model/tag-state";

const PostListSearch = () => {
  const { searchQuery, handleChangeQuery, handleSearchPostList } = useSearchQuery();
  const { tagList } = tagListState();
  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="게시물 검색..."
            className="pl-8"
            value={searchQuery.keyword}
            onChange={e => handleChangeQuery("keyword", e.target.value)}
            onKeyPress={e => handleSearchPostList(e.key)}
          />
        </div>
      </div>

      <Select
        value={searchQuery.tag}
        onValueChange={value => {
          handleChangeQuery("tag", value);
          // fetchPostsByTag(value);
          // updateURL();
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="태그 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">모든 태그</SelectItem>
          {tagList.map(tag => (
            <SelectItem key={tag.url} value={tag.slug}>
              {tag.slug}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={searchQuery.sortBy}
        onValueChange={value => handleChangeQuery("sortBy", value)}
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
        value={searchQuery.sortOrder}
        onValueChange={value => handleChangeQuery("sortOrder", value)}
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

export default PostListSearch;
