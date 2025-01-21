import { useTranslation } from 'react-i18next'
import { PERMISSIONS } from 'src/configs/permission'
import { ROUTE_CONFIG } from 'src/configs/route'

export type TVertical = {
  title: string
  path?: string
  icon: string
  permission?: string
  childrens?: {
    title: string
    path?: string
    icon: string
    permission?: string
  }[]
}

export const VerticalItems = () => {
  const { t } = useTranslation()

  return [
    {
      title: t('Dashboard'),
      icon: 'material-symbols-light:dashboard-outline',
      path: ROUTE_CONFIG.DASHBOARD,
      permission: PERMISSIONS.DASHBOARD
    },
    {
      title: t('Appointments'),
      icon: 'lsicon:work-order-appointment-filled',
      path: ROUTE_CONFIG.APPOINTMENTS,
      permission: PERMISSIONS.APPOINTMENTS
    },
    // {
    //   title: t('System'),
    //   icon: 'eos-icons:file-system-outlined',
    //   childrens: [
    //     {
    //       title: t('User'),
    //       icon: 'iconoir:group',
    //       path: ROUTE_CONFIG.SYSTEM.USER,
    //       permission: PERMISSIONS.SYSTEM.USER.VIEW
    //     },
    //     {
    //       title: t('Role'),
    //       icon: 'icon-park-outline:permissions',
    //       path: ROUTE_CONFIG.SYSTEM.ROLE,
    //       permission: PERMISSIONS.SYSTEM.ROLE.VIEW
    //     }
    //   ]
    // },
    // {
    //   title: t('Manage_product'),
    //   icon: 'eos-icons:products-outlined',
    //   childrens: [
    //     {
    //       title: t('List_product'),
    //       icon: 'icon-park-outline:ad-product',
    //       path: ROUTE_CONFIG.MANAGE_PRODUCT.PRODUCT,
    //       permission: PERMISSIONS.MANAGE_PRODUCT.PRODUCT.VIEW
    //     },
    //     {
    //       title: t('Type_product'),
    //       icon: 'material-symbols-light:category-outline',
    //       path: ROUTE_CONFIG.MANAGE_PRODUCT.MANAGE_TYPE_PRODUCT
    //     },
    //     {
    //       title: t('Comment'),
    //       icon: 'material-symbols-light:comment-outline',
    //       path: ROUTE_CONFIG.MANAGE_PRODUCT.COMMENT
    //     }
    //   ]
    // },
    {
      title: t('Manage_order'),
      icon: 'carbon:order-details',
      childrens: [
        {
          title: t('List_order'),
          icon: 'lets-icons:order-light',
          path: ROUTE_CONFIG.MANAGE_ORDER.ORDER,
          permission: PERMISSIONS.MANAGE_ORDER.ORDER.VIEW
        }
        // {
        //   title: t('List_review'),
        //   icon: 'carbon:review',
        //   path: ROUTE_CONFIG.MANAGE_ORDER.MANAGE_REVIEW
        // }
      ]
    },
    {
      title: t('Setting'),
      icon: 'ant-design:setting-outlined',
      childrens: [
        {
          title: t('Category'),
          icon: 'icon-park-outline:ad-product',
          path: ROUTE_CONFIG.SETTINGS.PACKAGE
        },
        {
          title: t('Package'),
          icon: 'eos-icons:service-outlined',
          path: ROUTE_CONFIG.SETTINGS.SERVICE
        },
        {
          title: t('About-us'),
          icon: 'mdi:about-circle-outline',
          path: ROUTE_CONFIG.SETTINGS.ABOUT
        },
        {
          title: t('Banner'),
          icon: 'material-symbols-light:gallery-thumbnail-outline-rounded',
          path: ROUTE_CONFIG.SETTINGS.BANNER
        }
        // {
        //   title: t('City'),
        //   icon: 'solar:city-outline',
        //   path: ROUTE_CONFIG.SETTINGS.CITY
        // }
        // {
        //   title: t('Delivery_method'),
        //   icon: 'carbon:delivery',
        //   path: ROUTE_CONFIG.SETTINGS.DELIVERY_TYPE
        // },
        // {
        //   title: t('Payment_method'),
        //   icon: 'streamline:payment-10',
        //   path: ROUTE_CONFIG.SETTINGS.PAYMENT_TYPE
        // }
      ]
    }
  ]
}
