import useFetchTags from "@/entities/tag/api/useFetchTags";
import { useNavigator } from "@/shared/lib/useNavigator";
import { usePostContext } from "@/shared/model/PostContext";
import { Select } from "@/shared/ui/Select";

const FilterTags = () => {
  const { refetch } = usePostContext();
  const { queries, handleUpdateQuery } = useNavigator();
  const { tags } = useFetchTags();

  return (
    <Select.Container
      value={queries.tag}
      onValueChange={(value) => {
        handleUpdateQuery("tag", value);
        refetch();
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

export default FilterTags;
