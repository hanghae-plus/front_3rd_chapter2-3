import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/ui/select/ui"
import { ParamValue } from "../model/types.ts"

interface Props {
  sortOrder: string
  setParam: (key: "sortOrder", value?: ParamValue) => void
}

const SortOrderSelect = ({ sortOrder, setParam }: Props) => {
  return (
    <Select value={sortOrder} onValueChange={(value) => setParam("sortOrder", value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="정렬 순서" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="asc">오름차순</SelectItem>
        <SelectItem value="desc">내림차순</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default SortOrderSelect
