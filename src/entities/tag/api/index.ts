export const tagApis = {
  fetchTagList: async () => {
    const response = await fetch("/api/posts/tags");
    return await response.json();
  },
};
