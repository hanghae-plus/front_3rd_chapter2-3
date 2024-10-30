import { useNavigator } from "@/shared/model/useNavigator";
import { Select } from "@/shared/ui/Select";

const FilterOrder = () => {
  const {
    handleUpdateQuery,
    queries: { sortOrder },
  } = useNavigator();
  return (
    <Select.Container value={sortOrder} onValueChange={(value) => handleUpdateQuery("sortOrder", value)}>
      <Select.Trigger className="w-[180px]">
        <Select.Value placeholder="정렬 순서" />
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="asc">오름차순</Select.Item>
        <Select.Item value="desc">내림차순</Select.Item>
      </Select.Content>
    </Select.Container>
  );
};

export default FilterOrder;
