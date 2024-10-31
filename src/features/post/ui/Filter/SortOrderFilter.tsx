import { SelectValue } from '@radix-ui/react-select';

import { Select } from '../../../../shared/ui/molecules/Select/ui/Select';
import SelectContent
  from '../../../../shared/ui/molecules/Select/ui/SelectContent';
import SelectItem from '../../../../shared/ui/molecules/Select/ui/SelectItem';
import SelectTrigger
  from '../../../../shared/ui/molecules/Select/ui/SelectTrigger';
import { useSearchStore } from '../../../postSearch/model/useSearchStore';

const SortOrderFilter = () => {
  const { sortOrder, setSortOrder } = useSearchStore()

  return (
    <Select value={sortOrder} onValueChange={setSortOrder}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="정렬 순서" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="asc">오름차순</SelectItem>
        <SelectItem value="desc">내림차순</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default SortOrderFilter
