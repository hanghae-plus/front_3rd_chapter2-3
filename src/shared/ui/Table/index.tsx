import { TableRoot } from "./TableRoot"
import { TableBody } from "./TableBody"
import { TableCell } from "./TableCell"
import { TableHead } from "./TableHead"
import { TableHeader } from "./TableHeader"
import { TableRow } from "./TableRow"

export const Table = Object.assign(TableRoot, {
  Header: TableHeader,
  Head: TableHead,
  Body: TableBody,
  Cell: TableCell,
  Row: TableRow,
})
