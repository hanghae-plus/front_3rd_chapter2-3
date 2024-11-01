import { SearchInput } from '~/features/search/ui/SearchInput';
import { SearchSelect } from '~/features/search/ui/SearchSelect';

export const SearchFilter = () => {
  return (
    <div className="flex gap-4">
      <SearchInput />
      <SearchSelect />
    </div>
  );
};
