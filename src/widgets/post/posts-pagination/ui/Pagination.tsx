import { type FC } from "react"
import { useAtom } from "jotai"
import { Button } from "@/shared/ui/components/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/components/select"
import { postsManagerState } from "@/pages/posts-manager/model/store"

interface PaginationProps {
  total: number
}

export const Pagination: FC<PaginationProps> = ({ total }) => {
  const [state, setState] = useAtom(postsManagerState)
  const { currentPage, itemsPerPage } = state.pagination

  const handlePageChange = (page: number) => {
    setState((prev) => ({
      ...prev,
      pagination: { ...prev.pagination, currentPage: page },
    }))
  }

  const handleItemsPerPageChange = (value: string) => {
    setState((prev) => ({
      ...prev,
      pagination: {
        currentPage: 1,
        itemsPerPage: Number(value),
      },
    }))
  }

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span>표시</span>
        <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="30">30</SelectItem>
          </SelectContent>
        </Select>
        <span>항목</span>
      </div>
      <div className="flex gap-2">
        <Button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
          이전
        </Button>
        <Button disabled={currentPage * itemsPerPage >= total} onClick={() => handlePageChange(currentPage + 1)}>
          다음
        </Button>
      </div>
    </div>
  )
}
