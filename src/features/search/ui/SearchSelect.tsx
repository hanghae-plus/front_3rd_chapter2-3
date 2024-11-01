import { useSearchParams } from 'react-router-dom';

import { usePost } from '~/features/post/model/usePost';
import { useTags } from '~/features/tags/model/useTags';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/shared/ui/Select';

export const SearchSelect = () => {
  // URL query params
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedTag = searchParams.get('tag') ?? '';
  const sortBy = searchParams.get('sortBy') ?? '';
  const sortOrder = searchParams.get('sortOrder') ?? '';

  const { tags } = useTags();
  const { fetchPostsByTag } = usePost();

  const changeSelectedValue = (tag: string) => {
    setSearchParams({ tag: tag });
    fetchPostsByTag(tag);
  };

  return (
    <>
      <Select value={selectedTag} onValueChange={changeSelectedValue}>
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
      <Select
        value={sortBy}
        onValueChange={(sortBy) => {
          setSearchParams({ sortBy: sortBy });
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
        onValueChange={(sortOrder) => {
          setSearchParams({ sortOrder: sortOrder });
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
    </>
  );
};
