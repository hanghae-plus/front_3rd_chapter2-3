import { TableHead, TableHeader, TableRow } from "../../../../../shared"
import { POST_TABLE_HEADERS } from "../../../model/constants"

export const PostTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        {POST_TABLE_HEADERS.map(({ id, label, width }) => (
          <TableHead key={id} className={width}>
            {label}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  )
}