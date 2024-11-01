export const convertToTagOptions = (apiTagResult: { slug: string }[]) => {
  return [
    { id: -1, value: "all", label: "모든 태그" },
    ...apiTagResult.map((tag: { slug: string }, idx) => ({
      id: idx,
      label: tag.slug,
      value: tag.slug,
    })),
  ]
}
