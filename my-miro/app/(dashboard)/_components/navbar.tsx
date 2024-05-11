'use client'

import { UserButton } from "@clerk/nextjs"

export const Navbar = () => {
  const navbarContainer_class = 'flex item-center gap-x-4 p-5 bg-green-300' // remove bg-color later
  const searchContainer_class = 'hidden lg:flex lg:flex-1 bg-yellow-300' // remove bg-color later

  return (
    <div className={navbarContainer_class}>
      <div className={searchContainer_class}>
        Search Bar
      </div>
      <UserButton />
    </div>
  )
}