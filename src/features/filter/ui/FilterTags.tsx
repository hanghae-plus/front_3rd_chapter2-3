import useFetchTags from "@/entities/tag/api/useFetchTags";
import { Select } from "@/shared/ui/Select";

type FilterTagsProps = {
  selectedTag: string;
  setSelectedTag: (selectedTag: string) => void;
  fetchPostsByTag: (selectedTag: string) => void;
  updateURL: () => void;
};

const FilterTags = ({ selectedTag, setSelectedTag, fetchPostsByTag, updateURL }: FilterTagsProps) => {
  const { tags, isLoading } = useFetchTags();

  if (isLoading) return <div>로딩중...</div>;

  return (
    <Select.Container
      value={selectedTag}
      onValueChange={(value) => {
        setSelectedTag(value);
        fetchPostsByTag(value);
        updateURL();
      }}
    >
      <Select.Trigger className="w-[180px]">
        <Select.Value placeholder="태그 선택" />
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="all">모든 태그</Select.Item>
        {tags.map((tag) => (
          <Select.Item key={tag.url} value={tag.slug}>
            {tag.slug}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Container>
  );
};

export default FilterTags;
