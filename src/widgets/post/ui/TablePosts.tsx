import ModalEditPost from "@/features/post/ui/modals/ModalEditPost";
import ModalPostDetail from "@/features/post/ui/modals/ModalPostDetail";
import ModalUserInfo from "@/features/user/ui/modals/ModalUserInfo";

import { usePostContext } from "@/entities/post/model/PostContext";
import { useNavigator } from "@/shared/lib/useNavigator";
import { highlightText } from "@/shared/lib/utils";
import { Button, Table } from "@/shared/ui";
import Pagination from "@/shared/ui/Pagination";

import { ThumbsDown, ThumbsUp, Trash2 } from "lucide-react";
import { useEffect } from "react";

const TablePosts = () => {
  const { queries, handleUpdateQuery } = useNavigator();
  const { search, tag: selectedTag, limit, skip } = queries;
  const { loading, posts, total, actions } = usePostContext();

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
                    <div className="flex flex-wrap gap-1">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                            tag === selectedTag
                              ? "text-white bg-blue-500 hover:bg-blue-600"
                              : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                          }`}
                          onClick={async () => {
                            handleUpdateQuery("tag", tag);
                            await actions.fetchPostsByTag(tag);
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
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
                  <div className="flex items-center gap-2">
                    {/* 게시물 상세 보기 대화상자 */}
                    <ModalPostDetail post={post} />

                    <ModalEditPost post={post} />
                    <Button variant="ghost" size="sm" onClick={async () => await actions.deletePost(post.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Container>
      )}
      <Pagination
        size={limit}
        setSize={async (size) => {
          handleUpdateQuery("limit", size.toString());
          await actions.fetchPosts({ limit: size, skip });
        }}
        page={skip}
        setPage={async (page) => {
          handleUpdateQuery("skip", page.toString());
          await actions.fetchPosts({ limit, skip: page });
        }}
        total={total}
      />
    </>
  );
};

export default TablePosts;
