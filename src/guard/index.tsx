import { ReactNode } from "react"
import AuthGuard from "src/guard/AuthGuard"
import GuestGuard from "src/guard/GuestGuard"
import NoGuard from "src/guard/NoGuard"


type GuardProps = {
      authGuard?: boolean
      guestGuard?: boolean
      children: ReactNode
}

const Guard = ({ children, authGuard, guestGuard }: GuardProps) => {
      if (guestGuard) {
            return <GuestGuard fallback={<span />}>
                  {children}
            </GuestGuard>
      } else if (!guestGuard && !authGuard) {
            return <NoGuard fallback={<span />}>{children}</NoGuard>
      } else {
            return <AuthGuard fallback={<span />}>{children}</AuthGuard>
      }
}

export default Guard