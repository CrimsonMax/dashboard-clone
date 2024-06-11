'use client'

import { useOrganization } from "@clerk/nextjs"
import { EmptyOrg } from "./_components/empty-org"
import { BoardList } from "./_components/board-list"

interface DashboardsPageProps {
  searchParams: {
    search?: string
    favorites?: string
  }
}

export default function ({ searchParams }: DashboardsPageProps) {
  const dashboardContainer_class = 'flex-1 h-[calc(100%-80px)] p-6'

  const { organization } = useOrganization()

  return (
    <div className={dashboardContainer_class}>
      {!organization ? (
        <EmptyOrg />
      ) : (
        <BoardList
          orgId={organization.id}
          query={searchParams}
        />
      )}
    </div>
  )
}