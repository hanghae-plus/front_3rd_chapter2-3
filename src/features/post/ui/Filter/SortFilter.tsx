import { SelectValue } from '@radix-ui/react-select';

import { Select } from '../../../../shared/ui/molecules/Select/ui/Select';
import SelectContent
  from '../../../../shared/ui/molecules/Select/ui/SelectContent';
import SelectItem from '../../../../shared/ui/molecules/Select/ui/SelectItem';
import SelectTrigger
  from '../../../../shared/ui/molecules/Select/ui/SelectTrigger';
import { useSearchStore } from '../../../postSearch/model/useSearchStore';

const SortFilter = () => {
  const { sortBy, setSortBy } = useSearchStore()

  return (
    <Select value={sortBy} onValueChange={setSortBy}>
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
  )
}

export default SortFilter
