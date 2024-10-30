import { PostTableHeads } from "../../../features/post/ui/PostTableHeads"
import { TableHeader, TableRow } from "../../../shared/ui"

export const PostTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <PostTableHeads />
      </TableRow>
    </TableHeader>
  )
}
