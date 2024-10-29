import { usePostContext } from "@/entities/post/model/PostContext";
import { Post } from "@/entities/post/model/types";
import { useNavigator } from "@/shared/lib/useNavigator";

type PostTableRowTagsProps = {
  post: Post;
};

const PostTableRowTags = ({ post }: PostTableRowTagsProps) => {
  const { queries, handleUpdateQuery } = useNavigator();
  const { actions } = usePostContext();
  const { tag: selectedTag } = queries;

  return (
    <div className="flex flex-wrap gap-1">
      {post.tags.map((tag) => (
        <span
          key={tag}
          className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
            tag === selectedTag
              ? "text-white bg-blue-500 hover:bg-blue-600"
              : "text-blue-800 bg-blue-100 hover:bg-blue-200"
          }`}
          onClick={async () => {
            handleUpdateQuery("tag", tag);
            await actions.fetchPostsByTag(tag);
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default PostTableRowTags;
