'use client'

import { EmptyBoards } from "./empty-boards"
import { EmptyFavorites } from "./empty-favorites"
import { EmptySearch } from "./empty-search"

interface BoardlistProps {
  orgId: string
  query: {
    search?: string
    favorites?: string
  }
}

export const BoardList = ({ orgId, query }: BoardlistProps) => {
  const data = [] // TODO: Change to API call

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
      {JSON.stringify(query)}
    </div>
  )
}