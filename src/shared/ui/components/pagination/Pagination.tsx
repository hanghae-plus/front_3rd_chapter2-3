import { Button } from "../button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

export const Pagination = ({ currentPage, totalPages, onPageChange, className }: PaginationProps) => {
  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      <Button variant="outline" size="sm" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        <ChevronLeft className="h-4 w-4" />
        이전
      </Button>

      <div className="flex items-center justify-center text-sm">
        <span>{currentPage}</span>
        <span className="mx-2">/</span>
        <span>{totalPages}</span>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        다음
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
