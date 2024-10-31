import { ThumbsUp, ThumbsDown, MessageSquare, Edit2, Trash2 } from "lucide-react";
import { Button, HighlightText, TableCell, TableRow } from "../../../shared/ui";
import { Reaction } from "../../../widgets/post";

type Props = {
  post: Post & {
    author?: User;
  };
};

export function Post({ post }: Props) {
  const { id, title, tags, author, reactions } = post;
  return (
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell>
        <div className="space-y-1">
          <div>
            <HighlightText text={title} highlight="searchQuery" />
          </div>
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
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
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => openUserModal(author)}>
          <img src={author?.image} alt={author?.username} className="w-8 h-8 rounded-full" />
          <span>{author?.username}</span>
        </div>
      </TableCell>
      <TableCell>
        <Reaction reactions={reactions} />
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
          <Button variant="ghost" size="sm" onClick={() => deletePost(id)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
