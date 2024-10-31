import { useEffect, useState } from 'react';

import { fetchAllPostTags } from '~/entities/tag/api/tagApi';
import { Tags } from '~/entities/tag/model/type';

export const useTags = () => {
  const [tags, setTags] = useState<Tags>([]);
  const fetchTags = async () => {
    try {
      const tags = await fetchAllPostTags();
      setTags(tags);
    } catch (error) {
      console.error('태그 가져오기 오류:', error);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  return { tags };
};
