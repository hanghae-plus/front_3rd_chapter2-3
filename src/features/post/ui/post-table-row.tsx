import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react";
import { PostType } from "../../../entities/post";
import { renderHighlightText } from "../../../shared/lib";
import { Button, TableCell, TableRow } from "../../../shared/ui";
import { useCommentListQuery } from "../../comment/api/use-comment-list-query";
import { useUser } from "../../user";
import { usePostMutations } from "../api/use-post-mutations";
import { usePostQuery } from "../api/use-post-query";
import { usePost } from "../model/use-post";

interface PostTableRowPropsType {
  post: PostType;
}

export const PostTableRow = (props: PostTableRowPropsType) => {
  const { post } = props;

  const { setSelectedPost, setShowPostDetailDialog } = usePost();
  const { openUserModal } = useUser();

  const { updateParams, searchQuery, selectedTag } = usePostQuery();

  const handleOpenPostDetail = (post: PostType) => {
    setSelectedPost(post);
    useCommentListQuery(post.id);
    setShowPostDetailDialog(true);
  };

  const { deletePostMutation } = usePostMutations();

  const { setShowEditDialog } = usePost();

  const handleDeletePost = (id: number) => {
    deletePostMutation.mutate(id);
  };

  return (
    <TableRow>
      <TableCell>{post.id}</TableCell>
      <TableCell>
        <div className="space-y-1">
          <div>{renderHighlightText(post.title, searchQuery)}</div>

          <div className="flex flex-wrap gap-1">
            {(post?.tags || []).map((tag: string) => (
              <span
                key={tag}
                className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                  selectedTag === tag
                    ? "text-white bg-blue-500 hover:bg-blue-600"
                    : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                }`}
                onClick={() => {
                  updateParams({ tag: tag });
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
          onClick={() => openUserModal(post.author?.id ?? 0)}
        >
          <img
            src={post.author?.image || ""}
            alt={post.author?.username || ""}
            className="w-8 h-8 rounded-full"
          />
          <span>{post.author?.username || ""}</span>
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
          <Button variant="ghost" size="sm" onClick={() => handleOpenPostDetail(post)}>
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
  );
};
