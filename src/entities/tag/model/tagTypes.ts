export interface Tag {
  slug: string
  name: string
  url: string
}

export interface TagsResponse {
  tags: Tag[]
}

export interface TagState {
  tags: Tag[]
  setTags: (tags: Tag[]) => void
  addTag: (tag: Tag) => void
}
