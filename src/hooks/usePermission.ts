/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from 'react'
import { useAuth } from 'src/hooks/useAuth'
import { PERMISSIONS } from 'src/configs/permission'

type TActions = 'CREATE' | 'VIEW' | 'UPDATE' | 'DELETE'

export const usePermission = (key: string, actions: TActions[]) => {
  const { user } = useAuth()

  const defaultValues = {
    VIEW: false,
    CREATE: false,
    UPDATE: false,
    DELETE: false
  }

  // lấy được permission cuối cùng bằng cách truy cập theo permission của page
  const getObjectValue = (obj: any, key: string) => {
    const keys = key.split('.')
    let result = obj
    if (keys && key.length) {
      for (const k of keys) {
        if (k in result) {
          result = result[k]
        } else {
          return undefined
        }
      }
    }

    return result
  }

  const userPermission = user?.role?.permissions

  const permission = useMemo(() => {
    const mapPermission = getObjectValue(PERMISSIONS, key)

    const calculatedPermission = { ...defaultValues }

    actions.forEach(mode => {
      if (userPermission?.includes(PERMISSIONS.ADMIN)) {
        calculatedPermission[mode] = true
      } else if (mapPermission[mode] && userPermission?.includes(mapPermission[mode])) {
        calculatedPermission[mode] = true
      }
    })

    return calculatedPermission
  }, [key, actions, JSON.stringify(user?.role?.permissions)])

  return permission
}
