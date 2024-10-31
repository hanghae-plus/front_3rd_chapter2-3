import { Button } from "../../../shared/ui"
import { useRouterQueries } from "../../post/model/routerStore"

export const PageMove: React.FC<{
  total: number
}> = ({ total }) => {

  const { skip, limit, setSkip } = useRouterQueries();

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
