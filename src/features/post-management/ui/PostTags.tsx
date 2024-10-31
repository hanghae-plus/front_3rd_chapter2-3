import { FC } from 'react';
import { Tag } from 'lucide-react';
import { usePostStore } from '@/entities/post/model/store';

interface PostTagsProps {
  tags: string[];
}

export const PostTags: FC<PostTagsProps> = ({ tags }) => {
  const { filters, updateFilters } = usePostStore();
  
  const handleTagClick = (tag: string) => {
    updateFilters({ selectedTag: tag });
  };

  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1">
      {tags.map((tag) => (
        <span
          key={tag}
          onClick={() => handleTagClick(tag)}
          className={`
            inline-flex items-center px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer
            ${filters.selectedTag === tag 
              ? "text-white bg-blue-500 hover:bg-blue-600" 
              : "text-blue-800 bg-blue-100 hover:bg-blue-200"
            }
          `}
        >
          <Tag className="w-3 h-3 mr-1" />
          {tag}
        </span>
      ))}
    </div>
  );
};