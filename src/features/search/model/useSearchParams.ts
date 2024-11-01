import { useSearchParams } from 'react-router-dom';

export const useOwnSearchParams = () => {
  // URL query params
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') ?? '';
  const skip = searchParams.get('skip') || '0';
  const limit = searchParams.get('limit') || '10';
  const sortBy = searchParams.get('sortBy') || '';
  const sortOrder = searchParams.get('sortOrder') || 'asc';
  const selectedTag = searchParams.get('tag') || '';

  const updateSearchParams = (key: string, value: string) => {
    setSearchParams({ ...searchParams, [key]: value });
  };

  return { searchQuery, skip, limit, sortBy, sortOrder, selectedTag, updateSearchParams };
};
