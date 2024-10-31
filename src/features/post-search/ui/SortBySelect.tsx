import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/ui/select/ui"
import { ParamValue } from "../model/types.ts"

interface Props {
  sortBy: string
  setParam: (key: "sortBy", value?: ParamValue) => void
}

const SortBySelect = ({ sortBy, setParam }: Props) => {
  return (
    <Select value={sortBy} onValueChange={(value) => setParam("sortBy", value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="정렬 기준" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="none">없음</SelectItem>
        <SelectItem value="id">ID</SelectItem>
        <SelectItem value="title">제목</SelectItem>
        <SelectItem value="reactions">반응</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default SortBySelect
