import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { OrganizationProfile } from "@clerk/nextjs"
import { Plus } from "lucide-react"

export const InviteButton = () => {
  const plusIcon_class = 'h-4 w-4 mr-2'
  const dialogContent_class = 'p-0 bg-transparent border-none max-w-[880px] [&_*]:h-auto'

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <Plus className={plusIcon_class} />
          Invite member
        </Button>
      </DialogTrigger>
      <DialogContent className={dialogContent_class}>
        <OrganizationProfile routing="hash" />
      </DialogContent>
    </Dialog>
  )
}