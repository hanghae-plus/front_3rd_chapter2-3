import { useQueryParams } from "@/shared/model";
import HighlightText from "@/shared/ui/HighlightText";

type PostTableRowTitleProps = {
  title: string;
};

const PostTableRowTitle = ({ title }: PostTableRowTitleProps) => {
  const { queries } = useQueryParams();
  const { search } = queries;
  return (
    <div>
      <HighlightText text={title} highlight={search} />
    </div>
  );
};

export default PostTableRowTitle;
