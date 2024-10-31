import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/ui";

interface TagListProps {
  tags: any[];
  selectedTag: string;
  onSelectTag: (tag: string) => void;
}

export default function TagList ({ tags, selectedTag, onSelectTag }: TagListProps)  {
  return (
    <Select value={selectedTag} onValueChange={onSelectTag}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="태그 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">모든 태그</SelectItem>
        {tags.map((tag) => (
          <SelectItem key={tag.url} value={tag.slug}>
            {tag.slug}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};