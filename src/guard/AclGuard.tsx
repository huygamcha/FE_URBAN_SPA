"use client"
// ** React Imports
import { ReactNode, useEffect } from 'react'

// ** Types
import { buildAbilityFor, type ACLObj, AppAbility } from 'src/configs/acl'
import BlankLayout from 'src/views/layouts/BlankLayout'
import NotAuthorized from 'src/views/pages/not-authorized'
import { useAuth } from 'src/hooks/useAuth'
import { usePathname, useRouter } from 'next/navigation'
import { AbilityContext } from 'src/components/acl/Can'
import { PERMISSIONS } from 'src/configs/permission'
import { ROUTE_CONFIG } from 'src/configs/route'
import { createUrlQuery } from 'src/utils'
import i18nConfig from 'src/app/i18nConfig'
import { useTranslation } from 'react-i18next'

interface AclGuardProps {
  children: ReactNode
  authGuard?: boolean
  guestGuard?: boolean
  aclAbilities: ACLObj
  permission?: string[]
}

const AclGuard = (props: AclGuardProps) => {
  // ** Props
  const { aclAbilities, children, guestGuard = false, authGuard = true, permission } = props

  const auth = useAuth()
  const permissionUser = auth.user?.role?.permissions
    ? auth.user?.role?.permissions?.includes(PERMISSIONS.BASIC)
      ? [PERMISSIONS.DASHBOARD]
      : auth.user?.role?.permissions
    : []
  const router = useRouter()
  const pathName = usePathname()
  const {i18n} = useTranslation()
  const currentLang = i18n.language
  const url = currentLang === i18nConfig.defaultLocale ? '/' : `/${currentLang}`

  useEffect(() => {
    const url = currentLang === i18nConfig.defaultLocale ? '/' : `/${currentLang}`
    if(pathName === url) {
      router.push(ROUTE_CONFIG.HOME)
    }
  }, [pathName])

  let ability: AppAbility

  if (auth.user && !ability) {
    ability = buildAbilityFor(permissionUser, permission)
  }
  const url500 = currentLang === i18nConfig.defaultLocale ? '/500' : `/${currentLang}/500`
    const url404 = currentLang === i18nConfig.defaultLocale ? '/404' : `/${currentLang}/404`
  // if guest guard or no guard is tru or any error page
  if (guestGuard || pathName === url500 || pathName=== url404 || !authGuard) {
    if (auth.user && ability) {
      return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
    } else {
      return children
    }
  }

  // check the access off current user
  if (ability && auth.user && ability.can(aclAbilities.action, aclAbilities.subject)) {
    return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
  }

  return (
    <BlankLayout>
      <NotAuthorized />
    </BlankLayout>
  )
}

export default AclGuard
