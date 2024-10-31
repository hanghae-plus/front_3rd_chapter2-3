import { overlay } from "overlay-kit";

import { Button, TableCell } from "@/shared/ui";
import { PostDetailDialog } from "@/widgets/post/ui/post-detail-dialog";
import { PostItemType } from "@/entities/post/model/post-type";
import { Edit2, MessageSquare, Trash2 } from "lucide-react";

export const PostControl = ({ post }: PostItemType) => {
  return (
    <TableCell>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            overlay.open(({ isOpen, close }) => {
              return <PostDetailDialog post={post} isOpen={isOpen} close={close} />;
            })
          }
        >
          <MessageSquare className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            // setSelectedPost(post);
            // setShowEditDialog(true);
          }}
        >
          <Edit2 className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          // onClick={() => deletePost(post.id)}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </TableCell>
  );
};
