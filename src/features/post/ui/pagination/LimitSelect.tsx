import { filterStore } from '@features/post/model/stores'
import { Select } from '@shared/ui'

export const LimitSelect = () => {
  const { limit, setLimit } = filterStore()
  return (
    <div className="flex items-center gap-2">
      <span>표시</span>
      <Select.Container value={limit.toString()} onValueChange={(value: string) => setLimit(Number(value))}>
        <Select.Trigger className="w-[180px]">
          <Select.Value placeholder="10" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="10">10</Select.Item>
          <Select.Item value="20">20</Select.Item>
          <Select.Item value="30">30</Select.Item>
        </Select.Content>
      </Select.Container>
      <span>항목</span>
    </div>
  )
}
