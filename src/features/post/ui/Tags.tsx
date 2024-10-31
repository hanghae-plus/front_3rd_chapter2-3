import { usePostsStore } from "../store/usePostsStore";

export function Tag({ tag }: { tag: string }) {
  const { selectedTag, setSelectedTag } = usePostsStore();

  const handlePostTagClick = () => {
    setSelectedTag(tag);
    // updateURL();
  };
  return (
    <span
      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
        selectedTag === tag ? "text-white bg-blue-500 hover:bg-blue-600" : "text-blue-800 bg-blue-100 hover:bg-blue-200"
      }`}
      onClick={handlePostTagClick}
    >
      {tag}
    </span>
  );
}
