import { Post } from "@/entities/post/model/types";
import { highlightText } from "@/shared/lib/utils";
import { Button, Table } from "@/shared/ui";
import ModalUserInfo from "@/widgets/user/ui/ModalUserInfo";
import { ThumbsDown, ThumbsUp, Trash2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import ModalEditPost from "./ModalEditPost";
import ModalPostDetail from "./ModalPostDetail";

type TablePostsProps = {
  posts: Post[];
  searchQuery: string;
  selectedTag: string;
  setSelectedTag: (tag: string) => void;
  updateURL: () => void;
  deletePost: (postId: number) => void;
  setPosts: Dispatch<SetStateAction<Post[]>>;
  fetchComments: (postId: number) => Promise<void>;
  renderComments: (postId: number) => React.ReactNode;
};

const TablePosts = ({
  posts,
  searchQuery,
  selectedTag,
  setSelectedTag,
  updateURL,
  deletePost,
  setPosts,
  fetchComments,
  renderComments,
}: TablePostsProps) => {
  return (
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
                <div>{highlightText(post.title, searchQuery)}</div>
                <div className="flex flex-wrap gap-1">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                        selectedTag === tag
                          ? "text-white bg-blue-500 hover:bg-blue-600"
                          : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                      }`}
                      onClick={() => {
                        setSelectedTag(tag);
                        updateURL();
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
                <ModalPostDetail
                  fetchComments={fetchComments}
                  searchQuery={searchQuery}
                  renderComments={renderComments}
                  post={post}
                />

                <ModalEditPost setPosts={setPosts} />
                <Button variant="ghost" size="sm" onClick={() => deletePost(post.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Container>
  );
};

export default TablePosts;
