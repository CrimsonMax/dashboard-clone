'use client'

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { CreateOrganization } from "@clerk/nextjs"
import { Plus } from "lucide-react"

export const NewButton = () => {
  const buttonWrapper_class = 'aspect-square'
  const buttonIcon_class = 'text-white'
  const buttonStyle_class = 'bg-white/25 h-full w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition'
  const dialogContent_class = 'p-0 bg-transparent border-none max-w-[480px] w-fit [&_button]:z-10'

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className={buttonWrapper_class}>
          <button className={buttonStyle_class}>
            <Plus className={buttonIcon_class} />
          </button>
        </div>
      </DialogTrigger>
      <DialogContent className={dialogContent_class}>
        <CreateOrganization routing="hash" />
      </DialogContent>
    </Dialog>
  )
}