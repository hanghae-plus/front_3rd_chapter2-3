import { Post } from "@/entities/post/model/types";
import usePostsStore from "@/features/post/model/usePostsStore";
import { useNavigator } from "@/shared/lib/useNavigator";

type PostTableRowTagsProps = {
  post: Post;
};

const PostTableRowTags = ({ post }: PostTableRowTagsProps) => {
  const { queries, handleUpdateQuery } = useNavigator();
  const fetchPostsByTag = usePostsStore((state) => state.fetchPostsByTag);
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
            fetchPostsByTag(tag);
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default PostTableRowTags;
