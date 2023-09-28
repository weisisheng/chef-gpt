import { auth, currentUser } from "@clerk/nextjs"

import { Toaster } from "@/components/ui/toaster"
import { Footer } from "@/components/footer"
import { SiteHeader } from "@/components/site-header"

interface HomeLayoutProps {
  children: React.ReactNode
}

export default async function HomeLayout({ children }: HomeLayoutProps) {
  const user = await currentUser()
  const { userId } = auth()

  return (
    <>
      <div className="relative flex min-h-screen flex-col">
        {!user && <SiteHeader />}
        {user && <SiteHeader user={user} />}
        <div className="mx-auto flex-1">{children}</div>
        <Toaster />
        <Footer />
      </div>
    </>
  )
}
