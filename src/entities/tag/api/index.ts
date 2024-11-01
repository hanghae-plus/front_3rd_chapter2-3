export const tagApis = {
  fetchTagList: async (): Promise<ResTag> => {
    const response = await fetch("/api/posts/tags");
    return await response.json();
  },
};
