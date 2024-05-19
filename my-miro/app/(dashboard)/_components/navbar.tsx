'use client'

import { OrganizationSwitcher, UserButton, useOrganization } from "@clerk/nextjs"
import { SearchInput } from "./search-input"
import { InviteButton } from "./invite-button"

export const Navbar = () => {
  const navbarContainer_class = 'flex item-center gap-x-4 p-5'
  const searchContainer_class = 'hidden lg:flex lg:flex-1'
  const mobileBar_class = 'block lg:hidden flex-1'

  const { organization } = useOrganization()

  return (
    <div className={navbarContainer_class}>
      <div className={searchContainer_class}>
        <SearchInput />
      </div>
      <div className={mobileBar_class}>
        <OrganizationSwitcher
          hidePersonal
          appearance={{
            elements: {
              rootBox: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                maxWidth: '376px'
              },
              organizationSwitcherTrigger: {
                padding: '6px',
                width: '100%',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                justifyContent: 'space-between',
                backgroundColor: 'white',
              }
            }
          }}
        />
      </div>
      {organization && (<InviteButton />)}
      <UserButton />
    </div>
  )
}