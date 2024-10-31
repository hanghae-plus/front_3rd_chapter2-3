import { useMemo } from "react"
import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "."

export interface PaginationProps {
  skip: number
  limit: number
  total: number
  onChange: (value: number) => void
  onBackButton: (page: number) => void
  onNextButton: (page: number) => void
}

const Pagination = ({ skip, limit, total, onChange, onBackButton, onNextButton }: PaginationProps) => {
  const handleChange = (value: string) => {
    onChange(Number(value))
  }

  const handleBackButton = () => {
    onBackButton(Math.max(0, skip - limit))
  }

  const handleNextButton = () => {
    onNextButton(skip + limit)
  }

  const isBackButtonDisabled = useMemo(() => skip === 0, [skip])
  const isNextButtonDisabled = useMemo(() => skip + limit >= total, [skip, limit, total])

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span>표시</span>

        <Select value={limit.toString()} onValueChange={handleChange}>
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
        <Button disabled={isBackButtonDisabled} onClick={handleBackButton}>
          이전
        </Button>
        <Button disabled={isNextButtonDisabled} onClick={handleNextButton}>
          다음
        </Button>
      </div>
    </div>
  )
}

export default Pagination
