import PostPagination from "@/features/post/ui/PostPagination";
import PostTableRowActions from "@/features/post/ui/PostTableRowActions";
import ModalUserInfo from "@/features/user/ui/modals/ModalUserInfo";

import { usePostContext } from "@/entities/post/model/PostContext";

import { useNavigator } from "@/shared/lib/useNavigator";
import { highlightText } from "@/shared/lib/utils";
import { Table } from "@/shared/ui";

import PostTableRowTags from "@/features/post/ui/PostTableRowTags";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useEffect } from "react";

const TablePosts = () => {
  const { queries, handleUpdateQuery } = useNavigator();
  const { search, tag: selectedTag, limit, skip } = queries;
  const { loading, posts, actions } = usePostContext();

  // 게시물 삭제

  useEffect(() => {
    if (posts.length === 0) {
      actions.fetchPosts({ limit, skip });
    }
  }, [limit, skip, actions, posts]);

  return (
    <>
      {loading ? (
        <div>로딩 중...</div>
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
          <Table.Body>
            {posts.map((post) => (
              <Table.Row key={post.id}>
                <Table.Cell>{post.id}</Table.Cell>
                <Table.Cell>
                  <div className="space-y-1">
                    <div>{highlightText(post.title, search)}</div>
                    <PostTableRowTags post={post} />
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <ModalUserInfo post={post} />
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{post.reactions?.likes || 0}</span>
                    <ThumbsDown className="w-4 h-4" />
                    <span>{post.reactions?.dislikes || 0}</span>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <PostTableRowActions post={post} />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Container>
      )}
      <PostPagination />
    </>
  );
};

export default TablePosts;
