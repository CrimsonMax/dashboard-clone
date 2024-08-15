export const Toolbar = () => {
  const toolbarMain_class = 'absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4'
  const toolbarInner_class = 'bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md'
  const toolbarHistory_class = 'bg-white rounded-md p-1.5 flex flex-col items-center shadow-md'

  return (
    <div className={toolbarMain_class}>
      <div className={toolbarInner_class}>
        <div>
          Pencil
        </div>
        <div>
          Eraser
        </div>
        <div>
          Square
        </div>
        <div>
          Triangle
        </div>
      </div>
      <div className={toolbarHistory_class}>
        <div>
          Undo
        </div>
        <div>
          Redo
        </div>
      </div>
    </div>
  )
}

export const ToolbarSkeleton = () => {
  const toolbarMain_class = 'absolute top-[50%] -translate-y-[50%] left-2 flex flex-col bg-white gap-y-4 h-[360px] w-[52px] shadow-md rounded-md'

  return (
    <div className={toolbarMain_class} />
  )
}