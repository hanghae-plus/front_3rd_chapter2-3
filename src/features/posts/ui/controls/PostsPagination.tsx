import { Button } from "../../../../shared/ui/button"
import { Select } from "../../../../shared/ui/select"
import { useFilteredPosts } from "../../model/hooks/useFilteredPosts"
import { usePostsFilter } from "../../model/hooks/usePostsFilter"

export const PostsPagination = () => {
  const { skip, limit, onSkipChange, onLimitChange } = usePostsFilter()
  const { total } = useFilteredPosts()

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span>표시</span>
        <Select
          value={limit.toString()}
          onValueChange={(value) => onLimitChange(Number(value))}
          placeholder="10"
          options={[
            { value: "10", label: "10" },
            { value: "20", label: "20" },
            { value: "30", label: "30" },
          ]}
        />
        <span>항목</span>
      </div>
      <div className="flex gap-2">
        <Button disabled={skip === 0} onClick={() => onSkipChange(Math.max(0, skip - limit))}>
          이전
        </Button>
        <Button disabled={skip + limit >= (total ?? 0)} onClick={() => onSkipChange(skip + limit)}>
          다음
        </Button>
      </div>
    </div>
  )
}
