export const getAllQueryParams = (URLSearch: string) => {
  const params = new URLSearchParams(URLSearch);

  return {
    skip: parseInt(params.get('skip') || '0'),
    limit: parseInt(params.get('limit') || '10'),
    searchQuery: params.get('search') || '',
    sortBy: params.get('sortBy') || '',
    sortOrder: params.get('sortOrder') || 'asc',
    selectedTag: params.get('tag') || '',
  };
};
