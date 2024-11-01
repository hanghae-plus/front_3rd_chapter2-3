import { useSearchParams } from "@features/filter/hooks/useSearchParams"
import { Button } from "@shared/ui/button"

interface Props {
  total: number
}

export const PostNavigationButtons = ({ total }: Props) => {
  const { searchParams, goNextPage, goPrevPage } = useSearchParams()
  const { limit, skip } = searchParams

  const hasNotPrev = skip === 0
  const hasNotNext = skip + limit >= total

  return (
    <div className="flex gap-2">
      <Button disabled={hasNotPrev} onClick={goPrevPage}>
        이전
      </Button>
      <Button disabled={hasNotNext} onClick={goNextPage}>
        다음
      </Button>
    </div>
  )
} 