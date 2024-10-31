import { useQueryParams } from "@/shared/model";
import HighlightText from "@/shared/ui/HighlightText";

type PostTableRowTitleProps = {
  title: string;
};

export const PostTableRowTitle = ({ title }: PostTableRowTitleProps) => {
  const { queries } = useQueryParams();
  const { search } = queries;
  return (
    <div>
      <HighlightText text={title} highlight={search} />
    </div>
  );
};
