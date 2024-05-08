import { Navbar } from "./_components/navbar"
import { OrgSidebar } from "./_components/org-sidebar"
import { Sidebar } from "./_components/sidebar"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function ({ children }: DashboardLayoutProps) {
  const mainContainer_class = `h-full`
  const mainInner_class = `pl-[60px] h-full`
  const mainWrapper_class = `flex gap-x-3 h-full`
  const childrenContainer_class = `h-full flex-1`


  return (
    <main className={mainContainer_class}>
      <Sidebar />
      <div className={mainInner_class}>
        <div className={mainWrapper_class}>
          <OrgSidebar />
          <div className={childrenContainer_class}>
            <Navbar />
            {children}
          </div>
        </div>
      </div>
    </main>
  )
}