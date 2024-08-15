'use client'

import { Info } from "./info"
import { Participants } from "./participants"
import { Toolbar } from "./toolbar"

interface CanvasProps {
  boardId: string
}

export const Canvas = ({
  boardId
}: CanvasProps) => {
  const mainCanvas_class = 'h-full w-full relative bg-neutral-100 touch-none'

  return (
    <main className={mainCanvas_class}>
      <Info boardId={boardId} />
      <Participants />
      <Toolbar />
    </main>
  )
}