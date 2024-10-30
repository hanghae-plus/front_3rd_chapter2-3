import useFetchTags from "@/features/filter/api/use-get-tags";
import { useFilterTagPosts } from "@/features/post/api/use-filter-tag-post";

import { useQueryParams } from "@/shared/model/useQueryParams";
import { Select } from "@/shared/ui/Select";

const FilterTag = () => {
  const {
    queries: { tag },
    handleUpdateQuery,
  } = useQueryParams();
  const { data: tags } = useFetchTags();
  const { mutate: filterTagPosts } = useFilterTagPosts();

  const handleChangeTag = (value: string) => {
    handleUpdateQuery("tag", value);
    filterTagPosts(value);
  };

  return (
    <Select.Container value={tag} onValueChange={handleChangeTag}>
      <Select.Trigger className="w-[180px]">
        <Select.Value placeholder="태그 선택" />
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="all">모든 태그</Select.Item>
        {tags?.map((tag) => (
          <Select.Item key={tag.url} value={tag.slug}>
            {tag.slug}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Container>
  );
};

export default FilterTag;
