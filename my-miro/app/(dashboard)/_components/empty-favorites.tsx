import Image from "next/image"

export const EmptyFavorites = () => {
  const emptyFavoritesContainer_class = 'h-full flex flex-col items-center justify-center'
  const emptyFavoritesTitle_class = 'text-2xl font-semibold mt-6'
  const emptyFavoritesInfo_class = 'text-muted-foreground textg-sm mt-2'
  
  return (
    <div className={emptyFavoritesContainer_class}>
      <Image
        src='/empty-favorites.svg'     
        height={140}
        width={140}
        alt="Empty"
      />
      <h2 className={emptyFavoritesTitle_class}>
        No favorites!
      </h2>
      <p className={emptyFavoritesInfo_class}>
        Try favorite something.
      </p>
    </div>
  )
}