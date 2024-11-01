import type { Tag } from '@/entities/home/model/types';

export const getTags = async (): Promise<Tag[]> => {
  const response = await fetch('/api/posts/tags');
  const data = await response.json();
  return data;
};
