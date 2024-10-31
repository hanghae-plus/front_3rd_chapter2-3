export const deletePostApi = async (id: number): Promise<number> => {
  try {
    await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    })
    return id
  } catch (error) {
    console.error("게시물 삭제 오류:", error)
    throw new Error(`게시물 삭제 오류: ${error}`)
  }
}
