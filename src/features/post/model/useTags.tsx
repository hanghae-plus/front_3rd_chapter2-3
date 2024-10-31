import { useQuery } from '@tanstack/react-query';
import { fetchTags } from '../../../entities/tag/api/tagApi.js';
import { Tags } from '../../../entities/tag/api/types.js';

const useTags = () => {
  return useQuery<Tags,Error>({
    queryKey:['tags'],
    queryFn: fetchTags
  });
};

export default useTags;