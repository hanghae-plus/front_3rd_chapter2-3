import { Search } from 'lucide-react';
import { Input } from '../../shared/ui/InputBox/InputBox';

const SearchBar = ({ searchQuery, setSearchQuery, onSearch }) => {
  return (
    <div className="flex items-center">
      <Search className="mr-2 text-gray-500" />
      <Input
        placeholder="검색..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && onSearch()}
      />
    </div>
  );
};

export default SearchBar;