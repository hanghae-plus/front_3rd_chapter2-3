import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/ui";
import { useTagsQuery } from "../../tag/model/hook/useQuery";
import { useSearchFilterStore } from "../model/store/useSearchFilterStore";

export function SelectTag() {
  const { selectedTag, setSelectedTag } = useSearchFilterStore();

  const { data: tagsData = [] } = useTagsQuery();

  const handleCahngeTag = (value: string) => {
    setSelectedTag(value);
  };

  return (
    <Select value={selectedTag} onValueChange={handleCahngeTag}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="태그 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">모든 태그</SelectItem>
        {tagsData.map((tag) => (
          <SelectItem key={tag.url} value={tag.slug}>
            {tag.slug}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
