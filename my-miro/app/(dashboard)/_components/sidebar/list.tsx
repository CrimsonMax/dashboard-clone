'use client'

import { useOrganizationList } from "@clerk/nextjs"
import { Item } from "./item"

export const List = () => {
  const ulStyle_class = 'space-y-4 empty:hidden'

  const { userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    }
  })

  return (
    <ul className={ulStyle_class}>
      {userMemberships.data?.map((elem) => (
        <Item 
          key={elem.organization.id}
          id={elem.organization.id}
          name={elem.organization.name}
          imageUrl={elem.organization.imageUrl}
        />
      ))}
    </ul>
  )
}