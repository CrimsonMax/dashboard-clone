'use client'

import { useRenameModal } from "@/store/use-rename-modal"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { FormEventHandler, useEffect, useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useApiMutation } from "@/hooks/use-api-mutation"
import { api } from "@/convex/_generated/api"
import { toast } from "sonner"

export const RenameModal = () => {
  const form_class = 'space-y-4'

  const [isModal, setIsModal] = useState<boolean>(false)

  const { mutate, pending } = useApiMutation(api.board.update)
  const { isOpen, onClose, initialValues } = useRenameModal()

  const [title, setTitle] = useState(initialValues.title)

  useEffect(() => {
    setTitle(initialValues.title)
  }, [initialValues.title])

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        document.body.style.pointerEvents = ''
      }, 500) // fix for Dialog "pointer none" bug
    }
  },[isOpen])

  const onSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()

    mutate({
      id: initialValues.id,
      title
    })
      .then(() => {
        toast.success('Renamed!')
        onClose()
      })
      .catch(() => toast.error('Fail!'))
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Board Title
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Input new title
        </DialogDescription>
        <form onSubmit={onSubmit} className={form_class}>
          <Input
            disabled={pending}
            required
            maxLength={60}
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Title"
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant='outline'>
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={pending} type="submit">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}