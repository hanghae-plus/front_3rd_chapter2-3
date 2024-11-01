import { Button } from "../../../../shared/ui"
import usePost from "../../../../shared/hooks/usePost"

const PostPaginationButton = () => {
  const { skip, limit, total, setSkip } = usePost()
  function handleCahngeSkip(value: number) {
    setSkip(value)
  }
  return (
    <div className="flex gap-2">
      <Button disabled={skip === 0} onClick={() => handleCahngeSkip(Math.max(0, skip - limit))}>
        이전
      </Button>
      <Button disabled={skip + limit >= total} onClick={() => handleCahngeSkip(skip + limit)}>
        다음
      </Button>
    </div>
  )
}

export default PostPaginationButton
