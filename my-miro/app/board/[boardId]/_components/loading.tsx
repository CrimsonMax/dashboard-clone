import { Loader } from "lucide-react"
import { Info } from "./info"
import { Participants } from "./participants"
import { Toolbar } from "./toolbar"

export const Loading = () => {
  const mainLoading_class = 'h-full w-full relative bg-neutral-100 touch-none flex items-center justify-center'
  const loadingScreen_class = 'h-6 w-6 text-muted-foreground animate-spin'

  return (
    <main className={mainLoading_class}>
      <Loader className={loadingScreen_class} />
      <Info.Skeleton />
      <Participants.Skeleton />
      <Toolbar.Skeleton />
    </main>
  )
}