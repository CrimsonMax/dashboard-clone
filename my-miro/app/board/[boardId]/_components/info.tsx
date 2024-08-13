export const Info = () => {
  const infoMain_class = 'absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md'

  return (
    <div className={infoMain_class}>
      Info
    </div>
  )
}

Info.Skeleton = function InfoSkeleton() {
  const infoMain_class = 'absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]'

  return (
    <div className={infoMain_class} />
  )
}