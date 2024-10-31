import { Select, SelectLayout } from '@shared/ui'
import { filterStore } from '@features/post/model/stores'

export const SortOrderSelect = () => {
  const { sortOrder, setSortOrder } = filterStore()

  return (
    <SelectLayout
      placeholder="정렬 순서"
      value={sortOrder}
      onValueChange={(value) => setSortOrder(value as 'asc' | 'desc')}
    >
      <Select.Item value="asc">오름차순</Select.Item>
      <Select.Item value="desc">내림차순</Select.Item>
    </SelectLayout>
  )
}
