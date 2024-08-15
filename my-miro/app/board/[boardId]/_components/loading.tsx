import { Loader } from "lucide-react"
import { InfoSkeleton } from "./info"
import { ParticipantsSkeleton } from "./participants"
import { ToolbarSkeleton } from "./toolbar"

export const Loading = () => {
  const mainLoading_class = 'h-full w-full relative bg-neutral-100 touch-none flex items-center justify-center'
  const loadingScreen_class = 'h-6 w-6 text-muted-foreground animate-spin'

  return (
    <main className={mainLoading_class}>
      <Loader className={loadingScreen_class} />
      <InfoSkeleton />
      <ParticipantsSkeleton />
      <ToolbarSkeleton />
    </main>
  )
}