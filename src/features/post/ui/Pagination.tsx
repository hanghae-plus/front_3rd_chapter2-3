import { Button, Select } from '@shared/ui'
import { filterStore } from '@features/post/model/stores'
import { usePosts } from '../model/hooks'

export const Pagination = () => {
  const { limit, skip, setLimit, setSkip } = filterStore()
  const { total } = usePosts()

  return (
    <div className="flex justify-between items-center">
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

      <div className="flex gap-2">
        <Button disabled={skip === 0} onClick={() => setSkip(Math.max(0, skip - limit))}>
          이전
        </Button>
        <Button disabled={skip + limit >= total} onClick={() => setSkip(skip + limit)}>
          다음
        </Button>
      </div>
    </div>
  )
}
