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

  return (
    <Pagination
      size={limit}
      setSize={(size) => {
        handleUpdateQuery("limit", size.toString());
        fetchPosts({ limit: size, skip });
      }}
      page={skip}
      setPage={(page) => {
        handleUpdateQuery("skip", page.toString());
        fetchPosts({ limit, skip: page });
      }}
      total={total}
    />
  );
};

export default PostPagination;
