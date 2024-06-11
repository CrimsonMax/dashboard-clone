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

  if (!data?.length && query.search) {
    return (
      <div>
        <EmptySearch />
      </div>
    )
  } else if (!data?.length && query.favorites) {
    return (
      <div>
        <EmptyFavorites />
      </div>
    )
  } else {
    if (!data?.length) {
      return (
        <div>
          <EmptyBoards />
        </div>
      )
    }
  }

  return (
    <div>
      {JSON.stringify(query)}
    </div>
  )
}