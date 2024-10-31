import { Table } from "@/shared/ui";

export const PostTableHeader = () => {
  return (
    <Table.Header>
      <Table.Row>
        <Table.Head className="w-[50px]">ID</Table.Head>
        <Table.Head>제목</Table.Head>
        <Table.Head className="w-[150px]">작성자</Table.Head>
        <Table.Head className="w-[150px]">반응</Table.Head>
        <Table.Head className="w-[150px]">작업</Table.Head>
      </Table.Row>
    </Table.Header>
  );
};
