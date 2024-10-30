import { useQueryParams } from "@/shared/model/useQueryParams";
import { Select } from "@/shared/ui/Select";

const FilterSort = () => {
  const {
    handleUpdateQuery,
    queries: { sortBy },
  } = useQueryParams();
  return (
    <Select.Container value={sortBy} onValueChange={(value: string) => handleUpdateQuery("sortBy", value)}>
      <Select.Trigger className="w-[180px]">
        <Select.Value placeholder="정렬 기준" />
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="none">없음</Select.Item>
        <Select.Item value="id">ID</Select.Item>
        <Select.Item value="title">제목</Select.Item>
        <Select.Item value="reactions">반응</Select.Item>
      </Select.Content>
    </Select.Container>
  );
};

export default FilterSort;
