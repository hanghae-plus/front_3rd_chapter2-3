export const getResponseData = async(response) =>{
  const data = await response.json();
  return data;
}