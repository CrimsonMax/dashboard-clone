import Image from "next/image"

export const Loading = () => {
  const loaderContainer_class = `h-full w-full flex flex-col justify-center items-center`
  const loaderImage_class = `animate-pulse duration-700`

  return (
    <div className={loaderContainer_class}>
      <Image
        src='/logo.svg'
        alt="Logo"
        width={120}
        height={120}
        className={loaderImage_class}
      />
    </div>
  )
}