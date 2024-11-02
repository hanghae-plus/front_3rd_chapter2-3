import { usePosts } from '@features/post/model/hooks'
import { filterStore } from '@features/post/model/stores'
import { Button } from '@shared/ui'

export const SkipButton = () => {
  const { limit, skip, setSkip } = filterStore()
  const { total } = usePosts()

  return (
    <div className="flex gap-2">
      <Button disabled={skip === 0} onClick={() => setSkip(Math.max(0, skip - limit))}>
        이전
      </Button>
      <Button disabled={skip + limit >= total} onClick={() => setSkip(skip + limit)}>
        다음
      </Button>
    </div>
  )
}
