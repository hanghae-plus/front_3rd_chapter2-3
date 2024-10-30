import { Button } from "../../../shared/ui"

interface PostPaginationButtonProps {
  skip: number
  limit: number
  total: number
  setSkip: (value: number) => void
}

const PostPaginationButton = ({ skip, limit, total, setSkip }: PostPaginationButtonProps) => {
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

export default PostPaginationButton
