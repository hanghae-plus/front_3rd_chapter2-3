const CardHeader = () => {
  return (
    <div className={`flex flex-col space-y-1.5 p-6`}>
      <h3 className="flex items-center justify-between text-2xl font-semibold leading-none tracking-tight">
        <span>게시물 관리자</span>
        {/* <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          게시물 추가
        </Button> */}
      </h3>
    </div>
  )
}

export default CardHeader
