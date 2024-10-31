import { FC } from 'react';
import { Edit2, MessageSquare, Search, Trash2 } from 'lucide-react';
import { Button } from '../../../shared/ui/button/Button';
import { Post, SortOrder } from '../../../entities/post/model/types';
import { usePostStore } from '../../../entities/post/model/store';
import { Input } from '../../../shared/ui/input/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../shared/ui/select/Select';

type PostActionsProps = {
  post: Post;
  onView: (post: Post) => void;
  onEdit: (post: Post) => void;
  onDelete: (id: number) => void;
};

export const PostActions: FC<PostActionsProps> = ({
  post,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm" onClick={() => onView(post)}>
        <MessageSquare className="w-4 h-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={() => onEdit(post)}>
        <Edit2 className="w-4 h-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={() => onDelete(post.id)}>
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
};

// features/post-management/ui/SearchFilter.tsx
export const SearchFilter = () => {
  const { filters, updateFilters, searchPosts } = usePostStore();
  const { searchQuery, sortBy, sortOrder } = filters;

  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="게시물 검색..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => updateFilters({ searchQuery: e.target.value })}
            onKeyPress={(e) => e.key === "Enter" && searchPosts(searchQuery)}
          />
        </div>
      </div>
      <Select
        value={sortBy}
        onValueChange={(value) => updateFilters({ sortBy: value })}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 기준" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">없음</SelectItem>
          <SelectItem value="id">ID</SelectItem>
          <SelectItem value="title">제목</SelectItem>
          <SelectItem value="reactions">반응</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={sortOrder}
        onValueChange={(value) => 
          updateFilters({ sortOrder: value as SortOrder })
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 순서" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">오름차순</SelectItem>
          <SelectItem value="desc">내림차순</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};