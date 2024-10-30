import PostPagination from "@/features/post/ui/table/PostPagination";

import { useQueryParams } from "@/shared/model/useQueryParams";
import { Table } from "@/shared/ui";

import { useQueryPosts } from "@/features/post/api/use-get-post";
import PostTableIRow from "@/features/post/ui/table/PostTableIRow";

const TablePosts = () => {
  const { queries } = useQueryParams();
  const { data, isLoading } = useQueryPosts(queries);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center p-4">로딩 중...</div>
      ) : (
        <Table.Container>
          <Table.Header>
            <Table.Row>
              <Table.Head className="w-[50px]">ID</Table.Head>
              <Table.Head>제목</Table.Head>
              <Table.Head className="w-[150px]">작성자</Table.Head>
              <Table.Head className="w-[150px]">반응</Table.Head>
              <Table.Head className="w-[150px]">작업</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>{data?.posts?.map((post) => <PostTableIRow key={post.id} post={post} />)}</Table.Body>
        </Table.Container>
      )}
      <PostPagination total={data?.total || 0} size={queries.limit} skip={queries.skip} />
    </>
  );
};

export default TablePosts;