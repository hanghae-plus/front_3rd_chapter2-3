import { Table } from "lucide-react";
import { PostsTableHeader } from "./PostsTableHeader";
import { PostsTableBody } from "./PostsTableBody";
export function PostsTable() {
  return (
    <Table>
      <PostsTableHeader />
      <PostsTableBody />
    </Table>
  );
}
