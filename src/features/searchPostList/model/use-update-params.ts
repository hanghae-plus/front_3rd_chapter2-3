import { useNavigate } from "react-router-dom";
import { SearchQueryType } from "./search-query-type";

export const useUpdateParams = () => {
  const navigate = useNavigate();

  function updateParams(searchQuery: SearchQueryType) {
    const params = Object.entries(searchQuery)
      .filter(([, value]) => value !== "")
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    navigate("?" + params, { replace: true });
  }

  return { updateParams };
};
