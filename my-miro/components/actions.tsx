'use client'

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Link2, Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { useApiMutation } from "@/hooks/use-api-mutation"
import { api } from "@/convex/_generated/api"
import { ConfirmModal } from "./confirm-modal"
import { Button } from "./ui/button"
import { useRenameModal } from "@/store/use-rename-modal"

interface ActionsProps {
  children: React.ReactNode
  side?: DropdownMenuContentProps['side']
  sideOffset?: DropdownMenuContentProps['sideOffset']
  id: string
  title: string
}

export const Actions = ({
  children,
  side,
  sideOffset,
  id,
  title
}: ActionsProps) => {
  const dropdownMenu_class = 'w-60'
  const dropdownItem_class = 'p-3 cursor-pointer text-sm w-full justify-start font-normal'
  const link_class = 'h-4 w-4 mr-2'

  const { onOpen } = useRenameModal()
  const { mutate, pending } = useApiMutation(api.board.remove)

  const onCopyLink = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/board/${id}`
    )
      .then(() => toast.success('Link copied!'))
      .catch(() => toast.error('Fail!'))
  }

  const onDelete = () => {
    mutate({ id })
      .then(() => toast.success('Deleted!'))
      .catch(() => toast.error('Fail!'))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={e => e.stopPropagation()}
        side={side}
        sideOffset={sideOffset}
        className={dropdownMenu_class}
      >
        <DropdownMenuItem
          onClick={onCopyLink}
          className={dropdownItem_class}
        >
          <Link2 className={link_class} />
          Copy Board Link
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onOpen(id, title)}
          className={dropdownItem_class}
        >
          <Pencil className={link_class} />
          Rename
        </DropdownMenuItem>
        <ConfirmModal
          header="Delete Board?"
          description="This is delete the board!"
          disabled={pending}
          onConfirm={onDelete}
        >
          <Button
            variant={"ghost"}
            className={dropdownItem_class}
          >
            <Trash2 className={link_class} />
            Delete
          </Button>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}