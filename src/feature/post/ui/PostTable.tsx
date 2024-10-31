import { Table, TableBody, TableHead, TableHeader, TableRow } from "../../../shared/ui";
import { usePost } from "../model";
import { PostTableContent } from "./PostTableContent.tsx";

export const PostTable = () => {
  const { posts } = usePost();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">ID</TableHead>
          <TableHead>제목</TableHead>
          <TableHead className="w-[150px]">작성자</TableHead>
          <TableHead className="w-[150px]">반응</TableHead>
          <TableHead className="w-[150px]">작업</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <PostTableContent post={post} />
        ))}
      </TableBody>
    </Table>
  );
};
