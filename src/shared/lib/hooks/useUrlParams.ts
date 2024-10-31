import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function useUrlParams() {
  const location = useLocation();
  const navigate = useNavigate();
  const [params, setParams] = useState(new URLSearchParams(location.search));

  useEffect(() => {
    setParams(new URLSearchParams(location.search));
  }, [location.search]);

  const updateUrl = (newParams: Record<string, string>) => {
    const updatedParams = new URLSearchParams(params);
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        updatedParams.set(key, value);
      } else {
        updatedParams.delete(key);
      }
    });
    navigate(`?${updatedParams.toString()}`);
  };

  return { params, updateUrl };
}