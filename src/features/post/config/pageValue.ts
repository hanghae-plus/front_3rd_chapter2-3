interface PageOption {
  id: number
  value: string
  label: string
}

export const pageValue = {
  initial: {
    size: "10"
  },
  options: {
    size: [
      { id: 0, value: "10", label: "10" },
      { id: 1, value: "20", label: "20" },
      { id: 2, value: "30", label: "30" },
    ] satisfies PageOption[]
  }
} 