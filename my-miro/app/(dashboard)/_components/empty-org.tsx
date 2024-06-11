import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { CreateOrganization } from "@clerk/nextjs"
import Image from "next/image"

export const EmptyOrg = () => {
  const emptyContainer_class = 'h-full flex flex-col items-center justify-center'
  const emptyTitle_class = 'text-2xl font-semibold mt-6'
  const emptyInfo_class = 'text-muted-foreground text-sm mt-2'
  const emptyCreateBtnContainer_class = 'mt-6'
  const emptyCrateDialog_class = 'p-0 bg-transparent border-none max-w-[480px] w-fit [&_button]:z-10'

  return (
    <div className={emptyContainer_class}>
      <Image
        src='/elements.svg'
        alt="Empty"
        height={200}
        width={200}
      />
      <h2 className={emptyTitle_class}>
        Welcome to the Fun!
      </h2>
      <p className={emptyInfo_class}>
        Create an organisation to begin
      </p>

      <div className={emptyCreateBtnContainer_class}>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg">
              Create organisation
            </Button>
          </DialogTrigger>
          <DialogContent className={emptyCrateDialog_class}>
            <CreateOrganization routing="hash" />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}