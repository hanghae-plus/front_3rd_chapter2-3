import { usePostContext } from "@/entities/post/model/PostContext";
import { useNavigator } from "@/shared/lib/useNavigator";
import Pagination from "@/shared/ui/Pagination";

const PostPagination = () => {
  const { queries, handleUpdateQuery } = useNavigator();
  const { limit, skip } = queries;
  const { total, actions } = usePostContext();

  return (
    <Pagination
      size={limit}
      setSize={async (size) => {
        handleUpdateQuery("limit", size.toString());
        await actions.fetchPosts({ limit: size, skip });
      }}
      page={skip}
      setPage={async (page) => {
        handleUpdateQuery("skip", page.toString());
        await actions.fetchPosts({ limit, skip: page });
      }}
      total={total}
    />
  );
};

export default PostPagination;
