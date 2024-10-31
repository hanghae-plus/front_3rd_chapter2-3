import { useQueryPosts } from "@/features/post/api/use-get-post";
import { PostTableHeader, PostTablePagination, PostTableRow } from "@/features/post/ui/table";

import { useQueryParams } from "@/shared/model";
import { Loader, Table } from "@/shared/ui";

const TablePosts = () => {
  const { queries } = useQueryParams();
  const { data, isLoading, isError } = useQueryPosts(queries);

  if (isError) {
    return <div>에러가 발생했습니다.</div>;
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Table.Container>
          <PostTableHeader />
          <Table.Body>
            {data?.posts?.map((post) => <PostTableRow key={post.id} post={post} />) || (
              <tr>
                <td colSpan={5}>게시물이 없습니다.</td>
              </tr>
            )}
          </Table.Body>
        </Table.Container>
      )}
      <PostTablePagination total={data?.total || 0} size={queries.limit} skip={queries.skip} />
    </>
  );
};

export default TablePosts;
