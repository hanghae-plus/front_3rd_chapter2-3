import { TableCell } from "@/shared/ui";
import { PostItemType } from "../model/post-type";
import { TagInPostItem } from "@/features/post/ui/tag-in-post-item";
import { PostTitleHighlight } from "./post-title-highlight";

export const PostTitle = ({ post }: PostItemType) => {
  return (
    <TableCell>
      <div className="space-y-1">
        <div>
          <PostTitleHighlight text={post.title} />
        </div>

        <div className="flex flex-wrap gap-1">
          {post.tags.map(tag => (
            <TagInPostItem tag={tag} key={tag} />
          ))}
        </div>
      </div>
    </TableCell>
  );
};
