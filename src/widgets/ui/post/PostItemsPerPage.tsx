import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/ui"

interface PostItemsPerPageProps {
  value: string
  onChange: (value: string) => void
}

export const PostItemsPerPage = ({ value, onChange }: PostItemsPerPageProps) => (
  <div className="flex items-center gap-2">
    <span>표시</span>
    <Select value={value} onValueChange={onChange}>
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
)
