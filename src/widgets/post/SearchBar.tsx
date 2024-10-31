import { Search } from 'lucide-react';
import { Input } from '../../shared/ui/InputBox/InputBox';
import { searchQueryAtom } from '../../entities/post/model/postAtom';
import { useAtom } from 'jotai';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);


  return (
    <div className="flex items-center">
      <Search className="mr-2 text-gray-500" />
      <Input
        placeholder="검색..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;