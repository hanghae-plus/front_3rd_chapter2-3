import {
  Button,
  HighlightText,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../shared/ui";
import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react";
import { usePostContext } from "../model/PostContext.tsx";
import { useUser } from "../../user/model";
import { Post } from "../../../entities/post/model/types.ts";
import { deleteExistingPost } from "../../../entities/post/api";
import { User } from "../../../entities/user/model/types.ts";
import { getUserInfo } from "../../../entities/user/api";
import { useCommentContext } from "../../comment/model/CommentContext.tsx";
import { getComments } from "../../../entities/comment/api";

export const PostTable = () => {
  const {
    setShowPostDetailDialog,
    posts,
    searchQuery,
    selectedTag,
    setSelectedTag,
    updateURL,
    setSelectedPost,
    setShowEditDialog,
    setPosts,
  } = usePostContext();

  const { comments, setComments } = useCommentContext();

  const fetchComments = async (postId: number) => {
    if (comments[postId]) return;

    const response = await getComments(postId);
    if (response) {
      setComments((prev) => ({ ...prev, [postId]: response.comments }));
    }
  };

  const { setShowUserModal, setSelectedUser } = useUser();

  const handleDeletePost = async (id: number) => {
    await deleteExistingPost(id);

    setPosts(posts.filter((post) => post?.id !== id));
  };

  const handleOpenDetailPost = async (post: Post) => {
    setSelectedPost({ ...post });
    await fetchComments(post.id);
    setShowPostDetailDialog(true);
  };

  const handleOpenUserModal = async (user: User | undefined) => {
    if (user) {
      const userData = await getUserInfo(user);

      setSelectedUser(userData);
      setShowUserModal(true);
    }
  };

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
          <TableRow key={post.id}>
            <TableCell>{post.id}</TableCell>
            <TableCell>
              <div className="space-y-1">
                <div>{HighlightText(post.title, searchQuery)}</div>

                <div className="flex flex-wrap gap-1">
                  {post.tags?.map((tag) => (
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
            </TableCell>
            <TableCell>
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => handleOpenUserModal(post.author)}
              >
                <img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
                <span>{post.author?.username}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-4 h-4" />
                <span>{post.reactions?.likes || 0}</span>
                <ThumbsDown className="w-4 h-4" />
                <span>{post.reactions?.dislikes || 0}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => handleOpenDetailPost(post)}>
                  <MessageSquare className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedPost(post);
                    setShowEditDialog(true);
                  }}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDeletePost(post.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
