import { useEffect, useState } from "react";
import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react";
import { Button, HighlightText, TableCell, TableRow } from "../../../shared/ui";
import { useComment, useGetComment } from "../../comment/model";
import { Post } from "../../../entities/post/model/types.ts";
import { User } from "../../../entities/user/model/types.ts";
import { getUserInfo } from "../../../entities/user/api";
import { useDeletePost, usePost, useQueryParams } from "../model";
import { useUser } from "../../user/model";

interface PostTableContentProps {
  post: Post;
}

export const PostTableContent = ({ post }: PostTableContentProps) => {
  const {
    setShowPostDetailDialog,
    posts,
    searchQuery,
    selectedTag,
    setSelectedTag,
    setSelectedPost,
    setShowEditDialog,
    setPosts,
    selectedPost,
  } = usePost();
  const { comments, setComments } = useComment();
  const { setQueryParams } = useQueryParams();
  const { setShowUserModal, setSelectedUser } = useUser();

  const [id, setId] = useState<number>();

  const { data: commentData } = useGetComment(selectedPost?.id);
  const { mutate: deletePost } = useDeletePost({
    onSuccess: () => {
      //원래라면 querykey를 무효화해서 다시 받아와야 하지만 지금은 다시 받아오면 원래의 리스트를 받아오게 됨.
      // queryClient.invalidateQueries({ queryKey: ["post"] }).then();
      setPosts(posts.filter((post) => post?.id !== id));
    },
  });

  useEffect(() => {
    if (commentData && !comments[post.id]) {
      setComments((prev) => ({ ...prev, [post.id]: commentData.comments }));
    }
  }, [commentData, post.id, comments, setComments]);

  const handleOpenDetailPost = (post: Post) => {
    setSelectedPost(post);
    setShowPostDetailDialog(true);
  };

  const handleDeletePost = (id: number) => {
    setId(id);
    deletePost({ id: id });
  };

  const handleOpenUserModal = async (user: User | undefined) => {
    if (user) {
      const userData = await getUserInfo(user);
      setSelectedUser(userData);
      setShowUserModal(true);
    }
  };

  const handleClickTag = (tag: string) => {
    setSelectedTag(tag);
    setQueryParams({ selectedTag: tag });
  };

  const handleClickEditIcon = () => {
    setSelectedPost(post);
    setShowEditDialog(true);
  };

  return (
    <TableRow key={post.id}>
      <TableCell>{post.id}</TableCell>
      <TableCell>
        <div className="space-y-1">
          <div>{HighlightText(post.title, searchQuery)}</div>
          <div className="flex flex-wrap gap-1">
            {post.tags?.map((tag: string) => (
              <span
                key={tag}
                className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                  selectedTag === tag
                    ? "text-white bg-blue-500 hover:bg-blue-600"
                    : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                }`}
                onClick={() => handleClickTag(tag)}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleOpenUserModal(post.author)}>
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
          <Button variant="ghost" size="sm" onClick={() => handleClickEditIcon()}>
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleDeletePost(post.id)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};
