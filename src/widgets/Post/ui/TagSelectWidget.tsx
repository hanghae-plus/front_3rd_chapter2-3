import React from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../../../shared/ui"

interface TagSelectWidgetProps {
  selectedTag: string;
  setSelectedTag: (tag: string) => void;
  tags: { url: string; slug: string }[];
  fetchPostsByTag: (tag: string) => void;
  // updateURL: () => void;
}

const TagSelectWidget: React.FC<TagSelectWidgetProps> = ({ selectedTag, setSelectedTag, tags, fetchPostsByTag }) => {
    return (
        <Select
            value={selectedTag}
            onValueChange={(value) => {
            setSelectedTag(value)
            fetchPostsByTag(value)
            // updateURL()
            }}
        >
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

  export default TagSelectWidget;