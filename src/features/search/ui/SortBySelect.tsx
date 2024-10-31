import { Select } from '@shared/ui'
import { SelectLayout } from '@shared/ui'
import { filterStore } from '@features/post/model/stores'

export const SortBySelect = () => {
  const { sortBy, setSortBy } = filterStore()

  return (
    <SelectLayout placeholder="정렬 기준" value={sortBy} onValueChange={setSortBy}>
      <Select.Item value="none">없음</Select.Item>
      <Select.Item value="id">ID</Select.Item>
      <Select.Item value="title">제목</Select.Item>
      <Select.Item value="reactions">반응</Select.Item>
    </SelectLayout>
  )
}
