import { TableHead } from '../../../../shared/ui/organisms/Table/ui/TableHead';
import {
  TableHeader,
} from '../../../../shared/ui/organisms/Table/ui/TableHeader';
import { TableRow } from '../../../../shared/ui/organisms/Table/ui/TableRow';

const PostTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[50px]">ID</TableHead>
        <TableHead>제목</TableHead>
        <TableHead className="w-[150px]">작성자</TableHead>
        <TableHead className="w-[150px]">반응</TableHead>
        <TableHead className="w-[150px]">작업</TableHead>
      </TableRow>
    </TableHeader>
  )
}

export default PostTableHeader
