import useFetchTags from "@/features/filter-tag/api/useFetchTags";
import usePostsStore from "@/features/post/model/usePostsStore";

import { useNavigator } from "@/shared/lib/useNavigator";
import { Select } from "@/shared/ui/Select";

const FilterTag = () => {
  const {
    queries: { tag },
    handleUpdateQuery,
  } = useNavigator();
  const { tags } = useFetchTags();
  const fetchPostsByTag = usePostsStore((state) => state.fetchPostsByTag);

  const handleChangeTag = (value: string) => {
    handleUpdateQuery("tag", value);
    fetchPostsByTag(value);
  };

  return (
    <Select.Container value={tag} onValueChange={handleChangeTag}>
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

export default FilterTag;
