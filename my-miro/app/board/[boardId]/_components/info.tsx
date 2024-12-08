'use client'

import { Actions } from "@/components/actions"
import { Hint } from "@/components/hint"
import { Button } from "@/components/ui/button"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { cn } from "@/lib/utils"
import { useRenameModal } from "@/store/use-rename-modal"
import { useQuery } from "convex/react"
import { Menu } from "lucide-react"
import { Poppins } from "next/font/google"
import Image from "next/image"
import Link from "next/link"

interface InfoProps {
  boardId: string
}

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

export const Info = ({ boardId }: InfoProps) => {
  const infoMain_class = 'absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md'
  const infoButton_class = 'px-2'
  const boardLogo_class = 'font-semibold text-xl ml-2 text-black'
  const titleButton_class = 'text-base font-normal px-2'
  const separator_class = 'text-neutral-300 px-1.5'

  const { onOpen } = useRenameModal()

  const data = useQuery(api.board.get, {
    id: boardId as Id<'boards'>
  })

  if (!data) return <InfoSkeleton />

  const TabSeparator = () => {
    return (
      <div className={separator_class}>
        |
      </div>
    )
  }

  return (
    <div className={infoMain_class}>
      <Hint label="To Home" side="bottom" sideOffcet={10}>
        <Button asChild variant={"board"} className={infoButton_class}>
          <Link href='/'>
            <Image
              src='/logo.svg'
              alt="Logo"
              height={60}
              width={60}
            />
            <span className={cn(boardLogo_class, font.className)}>
              Tabby
            </span>
          </Link>
        </Button>
      </Hint>
      <TabSeparator />
      <Hint label="Rename" side="bottom" sideOffcet={10}>
        <Button
          variant='board'
          className={titleButton_class}
          onClick={() => onOpen(data._id, data.title)}
        >
          {data.title}
        </Button>
      </Hint>
    </div>
  )
}

export const InfoSkeleton = () => {
  const infoMain_class = 'absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]'

  return (
    <div className={infoMain_class} />
  )
}