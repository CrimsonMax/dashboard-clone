export const Sidebar = () => {
  const asideContainer_class = `fixed z-[1] left-0 bg-blue-950 h-full w-[60px] flex flex-col p-3 gap-y-4 text-white`

  return (
    <aside className={asideContainer_class}>
      Side
    </aside>
  )
}