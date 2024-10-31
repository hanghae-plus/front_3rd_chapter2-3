import { Search } from 'lucide-react';

import Input from '../../../../shared/ui/atoms/Input/ui/Input';
import { useSearchStore } from '../../../postSearch/model/useSearchStore';

const PostSearchBar = () => {
  const { search, setSearch } = useSearchStore()

  return (
    <div className="relative">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input placeholder="게시물 검색..." className="pl-8" value={search} onChange={(e) => setSearch(e.target.value)} />
    </div>
  )
}

export default PostSearchBar
