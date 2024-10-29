import { useQuery } from "@tanstack/react-query";

export const getResponseData = async(response) =>{
  const data = await response.json();
  return data;
}

