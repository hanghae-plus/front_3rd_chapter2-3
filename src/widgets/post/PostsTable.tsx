import { PostsTableHeader } from "./PostsTableHeader";
import { PostsTableBody } from "./PostsTableBody";
import { Table } from "../../shared/ui";

export function PostsTable() {
  return (
    <Table>
      <PostsTableHeader />
      <PostsTableBody />
    </Table>
  );
}
