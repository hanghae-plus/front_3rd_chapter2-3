import { TABLE_HEADERS } from "../../../shared/config/constants"
import { TableHead, TableHeader, TableRow } from "../../../shared/ui/Table"

export const PostTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        {TABLE_HEADERS.map(({ id, label, width }) => (
          <TableHead key={id} className={width}>
            {label}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  )
}
