import { usePost } from "../../../features/model/post/usePost"
import { useURLParams } from "../../../features/model/url/useURLParams"
import { URLParams } from "../../../shared/types"
import { PostItemsPerPage } from "../../../features/ui/post/PostItemsPerPage"
import { PostPaginationButtons } from "../../../features/ui/post/PostPaginationButtons"

export const PostPagination = () => {
  const { updateParams, params } = useURLParams()
  const { skip = 0, limit = 10 } = params as URLParams
  const { total } = usePost()
  return (
    <div className="flex justify-between items-center">
      <PostItemsPerPage value={limit.toString()} onChange={(value) => updateParams({ limit: Number(value) })} />
      <PostPaginationButtons
        skip={skip}
        limit={limit}
        total={total}
        onPrevious={() => updateParams({ skip: Math.max(0, skip - limit) })}
        onNext={() => updateParams({ skip: skip + limit })}
      />
    </div>
  )
}
