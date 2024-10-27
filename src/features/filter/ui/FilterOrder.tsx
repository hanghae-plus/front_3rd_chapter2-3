import { Select } from "@/shared/ui/Select";

type FilterOrderProps = {
  sortOrder: string;
  setSortOrder: (sortOrder: string) => void;
};

const FilterOrder = ({ sortOrder, setSortOrder }: FilterOrderProps) => {
  return (
    <Select.Container value={sortOrder} onValueChange={setSortOrder}>
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
