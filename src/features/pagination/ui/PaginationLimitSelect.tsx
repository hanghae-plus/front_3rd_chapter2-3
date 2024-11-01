import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/shared/ui/Select';

export const PaginationLimitSelect = () => {
  // URL query params
  const [searchParams, setSearchParams] = useSearchParams();
  const limit = Number(searchParams.get('limit') ?? '10');

  const handleLimitValueChange = useCallback(
    (value: string) => {
      setSearchParams({ limit: value });
    },
    [setSearchParams]
  );

  return (
    <Select value={limit.toString()} onValueChange={handleLimitValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="10" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="10">10</SelectItem>
        <SelectItem value="20">20</SelectItem>
        <SelectItem value="30">30</SelectItem>
      </SelectContent>
    </Select>
  );
};
