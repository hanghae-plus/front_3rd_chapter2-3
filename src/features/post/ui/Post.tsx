import { HighlightText, TableCell, TableRow } from "../../../shared/ui";
import { Reaction } from "../../../widgets/post";
import { Tag } from "./Tags";
import { PostButtons } from "./PostButtons";
import { UserAvatar } from "../../user/ui";

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
              <Tag key={tag} tag={tag} />
            ))}
          </div>
        </div>
      </TableCell>
      <TableCell>{author && <UserAvatar user={author} />}</TableCell>
      <TableCell>
        <Reaction reactions={reactions} />
      </TableCell>
      <TableCell>
        <PostButtons post={post} />
      </TableCell>
    </TableRow>
  );
}
