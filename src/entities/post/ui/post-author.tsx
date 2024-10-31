import { TableCell } from "@/shared/ui";
import { PostItemType } from "../model/post-type";
import { overlay } from "overlay-kit";
import { UserInfoDialog } from "@/entities/user/ui/user-info-dialog";

export const PostAuthor = ({ post }: PostItemType) => {
  return (
    <TableCell>
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() =>
          overlay.open(({ isOpen, close }) => {
            return <UserInfoDialog user={post.author} isOpen={isOpen} close={close} />;
          })
        }
      >
        <img
          src={post.author?.image}
          alt={post.author?.username}
          className="w-8 h-8 rounded-full"
        />
        <span>{post.author?.username}</span>
      </div>
    </TableCell>
  );
};
