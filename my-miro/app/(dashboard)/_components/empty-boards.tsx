'use client'

import { Button } from "@/components/ui/button"
import { api } from "@/convex/_generated/api"
import { useApiMutation } from "@/hooks/use-api-mutation"
import { useOrganization } from "@clerk/nextjs"
import Image from "next/image"
import { toast } from "sonner"

export const EmptyBoards = () => {
  const emptyBoardsContainer_class = 'h-full flex flex-col items-center justify-center'
  const emptyBoardsTitle_class = 'text-2xl font-semibold mt-6'
  const emptyBoardsInfo_class = 'text-muted-foreground textg-sm mt-2'
  const emptyBoardBtnWrapper_class = 'mt-6'

  const { organization } = useOrganization()
  const { mutate, pending } = useApiMutation(api.board.create)

  const onClick = () => {
    if (!organization) return

    mutate({
      orgId: organization.id,
      title: 'Untitled'
    })
      .then(id => {
        toast.success('IT HAS BEGAN!')
        // TODO: redirect to board/{id}
      })
      .catch(() => toast.error('FAIL'))
  }

  return (
    <div className={emptyBoardsContainer_class}>
      <Image
        src='/note.svg'
        height={110}
        width={110}
        alt="Empty"
      />
      <h2 className={emptyBoardsTitle_class}>
        Create a board!
      </h2>
      <p className={emptyBoardsInfo_class}>
        Just start creating.
      </p>
      <div className={emptyBoardBtnWrapper_class}>
        <Button disabled={pending} onClick={onClick} size='lg'>
          Create board
        </Button>
      </div>
    </div>
  )
}