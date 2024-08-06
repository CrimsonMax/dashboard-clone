'use client'

import { useQuery } from "convex/react"
import { EmptyBoards } from "./empty-boards"
import { EmptyFavorites } from "./empty-favorites"
import { EmptySearch } from "./empty-search"
import { api } from "@/convex/_generated/api"
import { BoardCard } from "./board-card"
import { NewBoardBtn } from "./new-board-button"

interface BoardlistProps {
  orgId: string
  query: {
    search?: string
    favorites?: string
  }
}

export const BoardList = ({ orgId, query }: BoardlistProps) => {
  const title_class = 'text-3xl'
  const boardsList_class = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10'

  const data = useQuery(api.boards.get, { orgId })

  if (data === undefined) {
    return (
      <div>
        <h2 className={title_class}>
          {query.favorites ? 'Favorites boards' : 'Team boards'}
        </h2>
        <div className={boardsList_class}>
          <NewBoardBtn orgId={orgId} disabled />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
        </div>
      </div>
    )
  }

  if (!data?.length && query.search && Array.isArray(query.search)) {
    return (
      <>
        <EmptySearch />
      </>
    )
  } else if (!data?.length && query.favorites) {
    return (
      <>
        <EmptyFavorites />
      </>
    )
  } else {
    if (!data?.length) {
      return (
        <>
          <EmptyBoards />
        </>
      )
    }
  }

  return (

    <div>
      <h2 className={title_class}>
        {query.favorites ? 'Favorites boards' : 'Team boards'}
      </h2>
      <div className={boardsList_class}>
        <NewBoardBtn orgId={orgId} />
        {data?.map(board => (
          <BoardCard
            key={board._id}
            id={board._id}
            title={board.title}
            imageUrl={board.imageUrl}
            authorId={board.authorId}
            authorName={board.authorName}
            createdAt={board._creationTime}
            orgId={board.orgId}
            isFavorite={board.isFavorite}
          />
        ))}
      </div>
    </div>
  )
}