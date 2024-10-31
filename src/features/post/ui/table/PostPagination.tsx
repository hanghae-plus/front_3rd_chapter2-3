import { useQueryParams } from "@/shared/model";
import Pagination from "@/shared/ui/Pagination";

type PostPaginationProps = {
  total: number;
  size: number;
  skip: number;
};

const PostPagination = ({ total, size, skip }: PostPaginationProps) => {
  const { handleUpdateQuery } = useQueryParams();

  const handlePageChange = (page: number) => {
    handleUpdateQuery("skip", page.toString());
  };

  const handleSizeChange = (size: number) => {
    handleUpdateQuery("limit", size.toString());
  };

  return <Pagination size={size} setSize={handleSizeChange} page={skip} setPage={handlePageChange} total={total} />;
};

export default PostPagination;
