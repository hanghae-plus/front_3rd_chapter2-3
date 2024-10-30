const fetchTags = async () => {
  const response = await fetch("/api/posts/tags");
  const data = await response.json();
  return data;
};

export const tagApi = { fetchTags };
