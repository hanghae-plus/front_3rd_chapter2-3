import { useNavigator } from "@/shared/lib/useNavigator";
import Pagination from "@/shared/ui/Pagination";
import { useShallow } from "zustand/shallow";
import usePostsStore from "../model/usePostsStore";

const PostPagination = () => {
  const { queries, handleUpdateQuery } = useNavigator();
  const { limit, skip } = queries;
  const { total, fetchPosts } = usePostsStore(
    useShallow((state) => ({
      total: state.total,
      fetchPosts: state.fetchPosts,
    })),
  );

  const handlePageChange = (page: number) => {
    handleUpdateQuery("skip", page.toString());
    fetchPosts({ limit, skip: page });
  };

  const handleSizeChange = (size: number) => {
    handleUpdateQuery("limit", size.toString());
    fetchPosts({ limit: size, skip });
  };

  return <Pagination size={limit} setSize={handleSizeChange} page={skip} setPage={handlePageChange} total={total} />;
};

export default PostPagination;
