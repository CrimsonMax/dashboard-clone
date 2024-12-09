'use client'

import { api } from "@/convex/_generated/api"
import { useApiMutation } from "@/hooks/use-api-mutation"
import { cn } from "@/lib/utils"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { title } from "process"
import { toast } from "sonner"

interface NewBoardBtnProps {
  orgId: string
  disabled?: boolean
}

export const NewBoardBtn = ({
  orgId,
  disabled
}: NewBoardBtnProps) => {
  const buttonContainer1_class = 'col-span-1 aspect-[100/127] bg-orange-600 rounded-lg hover:bg-orange-800 flex flex-col items-center justify-center py-6'
  const buttonContainer2_class = 'opacity-75 hover:bg-orange-600 cursor-not-allowed'
  const plusIcon_class = 'h-12 w-12 text-white stroke-1'
  const textTitle_class = 'text-sm text-white font-light'
  
  const { mutate, pending } = useApiMutation(api.board.create)
  const router = useRouter()

  const onClick = () => {
    mutate({
      orgId,
      title: 'undefined'
    })
    .then(id => {
      toast.success('Board Created!')
      // router.push(`/board/${id}`) // instant redirect after creation
    })
    .catch(() => toast.error('Oops! Failed :('))
  }

  return (
    <button
      disabled={pending || disabled}
      onClick={onClick}
      className={cn(buttonContainer1_class, (pending || disabled) && buttonContainer2_class)}
    >
      <div />
      <Plus className={plusIcon_class} />
      <p className={textTitle_class}>
        New Board
      </p>
    </button>
  )
}