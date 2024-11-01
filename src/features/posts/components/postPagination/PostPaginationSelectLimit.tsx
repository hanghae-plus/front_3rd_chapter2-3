import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../shared/ui"
import usePost from "../../../../shared/hooks/usePost"

const PostPaginationSelectLimit = () => {
  const { limit, setLimit } = usePost()
  function handleChangeLimit(value: number) {
    setLimit(value)
  }

  return (
    <Select value={limit.toString()} onValueChange={(value) => handleChangeLimit(Number(value))}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="10" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="10">10</SelectItem>
        <SelectItem value="20">20</SelectItem>
        <SelectItem value="30">30</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default PostPaginationSelectLimit
