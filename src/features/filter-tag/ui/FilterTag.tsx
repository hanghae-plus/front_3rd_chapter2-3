import useFetchTags from "@/entities/tag/api/useFetchTags";

import { usePostsByTagQuery } from "@/features/filter-tag/lib/usePostsByTagQuery";

import { useNavigator } from "@/shared/lib/useNavigator";
import { Select } from "@/shared/ui/Select";

const FilterTag = () => {
  const {
    queries: { tag },
    handleUpdateQuery,
  } = useNavigator();
  const { tags } = useFetchTags();
  const { getPostsByTag } = usePostsByTagQuery();

  return (
    <Select.Container
      value={tag}
      onValueChange={(value) => {
        handleUpdateQuery("tag", value);
        getPostsByTag(value);
      }}
    >
      <Select.Trigger className="w-[180px]">
        <Select.Value placeholder="태그 선택" />
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="all">모든 태그</Select.Item>
        {tags.map((tag) => (
          <Select.Item key={tag.url} value={tag.slug}>
            {tag.slug}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Container>
  );
};

export default FilterTag;
