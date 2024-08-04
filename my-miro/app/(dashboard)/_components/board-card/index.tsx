'use client'

import Image from "next/image"
import Link from "next/link"
import { Overlay } from "./overlay"
import { useAuth } from "@clerk/nextjs"
import { formatDistanceToNow } from "date-fns"
import { Footer } from "./Footer"
import { Skeleton } from "@/components/ui/skeleton"

interface BoardCardsProps {
  key: string
  id: string
  title: string
  imageUrl: string
  authorId: string
  authorName: string | undefined
  createdAt: number
  orgId: string
  isFavorite: boolean
}

export const BoardCard = ({
  key,
  id,
  title,
  imageUrl,
  authorId,
  authorName,
  createdAt,
  orgId,
  isFavorite,
}: BoardCardsProps) => {
  const { userId } = useAuth()
  const authorLabel = userId === authorId ? 'You' : authorName
  const createdAtLabel = formatDistanceToNow(createdAt, {
    addSuffix: true
  })

  const linkInnerDiv_class = 'group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden'
  const imageContainer_class = 'relative flex-1 bg-amber-50'
  const image_class = 'object-fit'

  return (
    <Link href={`/board/${id}`}>
      <div className={linkInnerDiv_class}>
        <div className={imageContainer_class}>
          <Image
            src={imageUrl}
            alt={title}
            fill
            className={image_class}
          />
          <Overlay />
        </div>
        <Footer
          isFavorite
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={() => { }}
          disabled={false}
        />
      </div>
    </Link>
  )
}

BoardCard.Skeleton = function BoardCardSkeleton() {
  const skeletonContainer_class = 'aspect-[100/127] rounded-lg overflow-hidden'
  const skeletonMain_class = 'h-full w-full'
  
  return (
    <div className={skeletonContainer_class}>
      <Skeleton className={skeletonMain_class} />
    </div>
  )
}