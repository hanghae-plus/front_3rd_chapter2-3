import { Search } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

import { usePost } from '~/features/post/model/usePost';

import { Input } from '~/shared/ui/Input';

export const SearchInput = () => {
  // URL query params
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') ?? '';

  const { searchPosts } = usePost();

  return (
    <div className="flex-1">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="게시물 검색..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchParams({ search: e.target.value })}
          onKeyPress={(e) => e.key === 'Enter' && searchPosts()}
        />
      </div>
    </div>
  );
};
