'use client'

import Image from "next/image"
import Link from "next/link"
import { Overlay } from "./overlay"
import { useAuth } from "@clerk/nextjs"
import { formatDistanceToNow } from "date-fns"
import { Footer } from "./footer"
import { Skeleton } from "@/components/ui/skeleton"
import { Actions } from "@/components/actions"
import { MoreHorizontal } from "lucide-react"
import { useApiMutation } from "@/hooks/use-api-mutation"
import { api } from "@/convex/_generated/api"
import { toast } from "sonner"

interface BoardCardsProps {
  // key: string
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
  // key,
  id,
  title,
  imageUrl,
  authorId,
  authorName,
  createdAt,
  orgId,
  isFavorite,
}: BoardCardsProps) => {
  const linkInnerDiv_class = 'group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden'
  const imageContainer_class = 'relative flex-1 bg-orange-50'
  const image_class = 'object-fit'
  const actionBtn_class = 'absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none'
  const actionBtnIcon_class = 'text-white opacity-75 hover:opacity-100 transition-opacity'

  const { userId } = useAuth()
  const authorLabel = userId === authorId ? 'You' : authorName
  const createdAtLabel = formatDistanceToNow(createdAt, {
    addSuffix: true
  })

  const {
    mutate: onFavorite,
    pending: pendingFavorite,
  } = useApiMutation(api.board.favorite)
  const {
    mutate: onUnfavorite,
    pending: pendingUnfavorite,
  } = useApiMutation(api.board.unfavorite)

  const toggleFavorite = () => {
    if (isFavorite) {
      onUnfavorite({ id })
        .catch(() => toast.error('Fail to unfavorite'))
    } else {
      onFavorite({ id, orgId })
        .catch(() => toast.error('Fail to favorite'))
    }
  }

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
          <Actions
            id={id}
            title={title}
            side="right"
          >
            <button className={actionBtn_class}>
              <MoreHorizontal
                className={actionBtnIcon_class}
              />
            </button>
          </Actions>
        </div>
        <Footer
          isFavorite={isFavorite}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={toggleFavorite}
          disabled={pendingFavorite || pendingUnfavorite}
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