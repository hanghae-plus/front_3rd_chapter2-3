const [tags, setTags] = useState([])

// 태그 가져오기
const fetchTags = async () => {
  try {
    const response = await fetch("/api/posts/tags")
    const data = await response.json()
    setTags(data)
  } catch (error) {
    console.error("태그 가져오기 오류:", error)
  }
}