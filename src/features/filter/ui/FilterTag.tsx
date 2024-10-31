import Tags from "@/entities/tag/ui/Tags";
import useFetchTags from "@/features/filter/api/use-get-tags";

import { useQueryParams } from "@/shared/model";
import { Select } from "@/shared/ui/Select";

const FilterTag = () => {
  const {
    queries: { tag },
    handleUpdateQuery,
  } = useQueryParams();
  const { data: tags } = useFetchTags();

  const handleChangeTag = (tag: string) => {
    handleUpdateQuery("tag", tag);
  };

  return (
    <Select.Container value={tag} onValueChange={handleChangeTag}>
      <Select.Trigger className="w-[180px]">
        <Select.Value placeholder="태그 선택" />
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="all">모든 태그</Select.Item>
        <Tags tags={tags} component={Select.Item} />
      </Select.Content>
    </Select.Container>
  );
};

export default FilterTag;
