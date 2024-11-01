import { useQuery } from '@tanstack/react-query';
import { getTags } from '@/entities/home/api/tagApi';
import { Tag } from '@/entities/home/model/types';

const useTag = () => {
  const { data } = useQuery<Tag[], Error>({
    queryKey: ['tags'],
    queryFn: getTags,
  });

  return {
    tags: data ?? [],
  };
};

export default useTag;
