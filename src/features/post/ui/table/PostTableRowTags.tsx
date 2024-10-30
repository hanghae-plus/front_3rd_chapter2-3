import { postQueries } from "@/entities/post/api/post-queries";
import { Post } from "@/entities/post/model/types";
import { useQueryParams } from "@/shared/model/useQueryParams";
import { useQueryClient } from "@tanstack/react-query";

type PostTableRowTagsProps = {
  post: Post;
};

const PostTableRowTags = ({ post }: PostTableRowTagsProps) => {
  const { queries, handleUpdateQuery } = useQueryParams();
  const { tag: selectedTag } = queries;
  const queryClient = useQueryClient();

  const handleTagClick = (tag: string) => {
    handleUpdateQuery("tag", tag);
    queryClient.prefetchQuery(postQueries.tag({ tag }));
  };

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
          onClick={() => handleTagClick(tag)}
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default PostTableRowTags;
