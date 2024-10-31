import { Button } from "../../../shared/ui"

export const PageMove: React.FC<{
  skip: number
  limit: number
  total: number
  setSkip: (value: number) => void
}> = ({ skip, limit, total, setSkip }) => {
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
