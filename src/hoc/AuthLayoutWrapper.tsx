import { ReactElement, ReactNode } from "react"
import { ACLObj, defaultACLObj } from "src/configs/acl"
import Guard from "src/guard"
import AclGuard from "src/guard/AclGuard"
import UserLayout from "src/views/layouts/UserLayout"


type TProps = {
      authGuard?: boolean
      guestGuard?: boolean
      children: ReactNode
      getLayout?: (page: ReactElement) => ReactNode
      permission?: string[]
      aclAbilities?: ACLObj
}

const AuthLayoutWrapper = (props: TProps) => {
      const { authGuard = true, guestGuard = false, children, permission, aclAbilities = defaultACLObj, getLayout } = props

      return (
            <Guard guestGuard={guestGuard} authGuard={authGuard}>
                  <AclGuard permission={permission} aclAbilities={aclAbilities} guestGuard={guestGuard} authGuard={authGuard}>
                        {
                              getLayout ? (
                                    <>
                                          {getLayout(<>{children}</>)}
                                    </>
                              ) : (
                                    <UserLayout>{children}</UserLayout>
                              )
                        }
                  </AclGuard>
            </Guard>
      )
}

export default AuthLayoutWrapper