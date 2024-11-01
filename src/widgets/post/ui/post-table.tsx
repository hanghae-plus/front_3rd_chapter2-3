import { PostType } from "../../../entities/post";
import { usePostQuery } from "../../../features/post/api/use-post-query";
import { usePostMutations } from "../../../features/post/api/use-post-mutations";
import { PostTableRow } from "../../../features/post/ui/post-table-row";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "../../../shared/ui";

// 게시물 테이블 렌더링
export const PostTable = () => {
  const { data: postList, isLoading: isQueryLoading } = usePostQuery();
  const { isLoading: isMutationLoading } = usePostMutations();

  const isLoading = isQueryLoading || isMutationLoading;

  if (isLoading) return <div className="flex justify-center p-4">로딩 중...</div>;

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
        {(postList || []).map((post: PostType) => (
          <PostTableRow key={post.id} post={post} />
        ))}
      </TableBody>
    </Table>
  );
};
