import { useSearchQuery } from "../model/use-search-query";

export const TagInPostItem = ({ tag }: { tag: string }) => {
  const { searchQuery, handleChangeQuery } = useSearchQuery();

  const selectedTagClass = (selectedTag: string) => {
    return selectedTag === tag
      ? "text-white bg-blue-500 hover:bg-blue-600"
      : "text-blue-800 bg-blue-100 hover:bg-blue-200";
  };
  return (
    <span
      key={tag}
      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${selectedTagClass(
        searchQuery.tag,
      )}`}
      onClick={() => handleChangeQuery("tag", tag)}
    >
      {tag}
    </span>
  );
};
