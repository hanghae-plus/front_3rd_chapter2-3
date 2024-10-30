import { HTMLAttributes } from "react";
import { Tag } from "../model/types";

type TagsProps = {
  tags: Tag[] | undefined;
  component?: React.ElementType;
} & HTMLAttributes<keyof React.JSX.IntrinsicElements>;

const Tags = ({ tags, component: Component = "button", ...props }: TagsProps) => {
  if (!tags) return null;
  return tags?.map((tag) => (
    <Component key={tag.url} value={tag.slug} {...props}>
      {tag.slug}
    </Component>
  ));
};

export default Tags;
