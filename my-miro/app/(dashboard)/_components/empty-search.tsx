import Image from "next/image"

export const EmptySearch = () => {
  const emptySearchContainer_class = 'h-full flex flex-col items-center justify-center'
  const emptySearchTitle_class = 'text-2xl font-semibold mt-6'
  const emptySearchInfo_class = 'text-muted-foreground textg-sm mt-2'
  
  return (
    <div className={emptySearchContainer_class}>
      <Image
        src='/empty-search.svg'     
        height={140}
        width={140}
        alt="Empty"
      />
      <h2 className={emptySearchTitle_class}>
        Nothing found!
      </h2>
      <p className={emptySearchInfo_class}>
        Try again.
      </p>
    </div>
  )
}