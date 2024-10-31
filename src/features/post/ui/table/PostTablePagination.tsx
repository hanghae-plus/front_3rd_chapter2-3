import { useQueryParams } from "@/shared/model";
import Pagination from "@/shared/ui/Pagination";

type PostPaginationProps = {
  total: number;
};

export const PostTablePagination = ({ total }: PostPaginationProps) => {
  const { handleUpdateQuery, queries } = useQueryParams();

  const handlePageChange = (page: number) => {
    handleUpdateQuery("skip", page.toString());
  };

  const handleSizeChange = (size: number) => {
    handleUpdateQuery("limit", size.toString());
  };

  return (
    <Pagination
      total={total}
      size={queries.limit}
      page={queries.skip}
      onSizeChange={handleSizeChange}
      onPageChange={handlePageChange}
    />
  );
};
