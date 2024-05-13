'use client'

import { Hint } from "@/components/hint"
import { cn } from "@/lib/utils"
import { useOrganization, useOrganizationList } from "@clerk/nextjs"
import Image from "next/image"

interface ItemProps {
  id: string
  name: string
  imageUrl: string
}

export const Item = ({ id, imageUrl, name }: ItemProps) => {
  const itemContainer_class = 'aspect-square relative'
  const itemImage_class = 'rounded-md cursor-pointer opacity-75 hover:opacity-100 transition'

  const { organization } = useOrganization()
  const { setActive } = useOrganizationList()

  const isActive = organization?.id === id

  const onClick = () => {
    if (!setActive) return

    setActive({ organization: id })
  }


  return (
    <div className={itemContainer_class}>
      <Hint
        label={name}
        side="right"
        align="center"
        sideOffcet={14}
      >
        <Image
          fill
          alt={name}
          src={imageUrl}
          onClick={onClick}
          className={cn(itemImage_class, isActive && 'opacity-100')}
        />
      </Hint>
    </div>
  )
}