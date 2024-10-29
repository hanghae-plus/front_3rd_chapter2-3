import PostPagination from "@/features/post/ui/PostPagination";

import { useNavigator } from "@/shared/lib/useNavigator";
import { Table } from "@/shared/ui";

import PostTableIRow from "@/features/post-table/ui/PostTableIRow";
import usePostsStore from "@/features/post/model/usePostsStore";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

const TablePosts = () => {
  const { queries } = useNavigator();
  const { search, limit, skip } = queries;
  const { loading, posts, fetchPosts } = usePostsStore(
    useShallow((state) => ({
      loading: state.loading,
      posts: state.posts,
      fetchPosts: state.fetchPosts,
    })),
  );

  useEffect(() => {
    if (posts.length === 0) {
      fetchPosts({ limit, skip });
    }
  }, [limit, skip, fetchPosts, posts]);

  return (
    <>
      {loading ? (
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
          <Table.Body>
            {posts.map((post) => (
              <PostTableIRow key={post.id} post={post} search={search} />
            ))}
          </Table.Body>
        </Table.Container>
      )}
      <PostPagination />
    </>
  );
};

export default TablePosts;
