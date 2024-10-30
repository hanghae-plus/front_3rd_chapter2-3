import { highlightText } from "../../../shared/lib/highlightText";
import { Button } from "../../../shared/ui/Button";
import { TableCell, TableRow } from "../../../shared/ui/Table";
import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react";

export const TableBodyRow = ({ post }) => {
  return (
    <TableRow key={post.id}>
      <TableCell>{post.id}</TableCell>
      <TableCell>
        <div className="space-y-1">
          <div>{highlightText(post.title, searchQuery)}</div>
          <div className="flex flex-wrap gap-1">{post.tags.map(PostTag)}</div>
        </div>
      </TableCell>
      <TableCell>
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => openUserModal(post.author)}
        >
          <img
            src={post.author?.image}
            alt={post.author?.username}
            className="w-8 h-8 rounded-full"
          />
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
          <Button variant="ghost" size="sm" onClick={() => openPostDetail(post)}>
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
          <Button variant="ghost" size="sm" onClick={() => deletePost(post.id)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};
