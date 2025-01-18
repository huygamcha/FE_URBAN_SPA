export const BASE_URL = `${process.env.NEXT_PUBLIC_API_HOST}/api/v1.0`

export const API_ENDPOINT = {
  AUTH: {
    INDEX: `${BASE_URL}/auth`,
    AUTH_ME: `${BASE_URL}/auth/me`
  },
  SYSTEM: {
    ROLE: {
      INDEX: `${BASE_URL}/roles`
    },
    USER: {
      INDEX: `${BASE_URL}/users`
    }
  },
  SETTING: {
    CITY: {
      INDEX: `${BASE_URL}/city`
    },
    ABOUT: {
      INDEX: `${BASE_URL}/about-us`
    },
    PACKAGE: {
      INDEX: `${BASE_URL}/packages`
    },
    SERVICE: {
      INDEX: `${BASE_URL}/services`
    },
    DELIVERY_TYPE: {
      INDEX: `${BASE_URL}/delivery-type`
    },
    PAYMENT_TYPE: {
      INDEX: `${BASE_URL}/payment-type`
    }
  },
  MANAGE_PRODUCT: {
    PRODUCT_TYPE: {
      INDEX: `${BASE_URL}/product-types`
    },
    PRODUCT: {
      INDEX: `${BASE_URL}/products`
    },
    COMMENT: {
      INDEX: `${BASE_URL}/comments`
    }
  },
  MANAGE_ORDER: {
    ORDER: {
      INDEX: `${BASE_URL}/orders`
    },
    REVIEW: {
      INDEX: `${BASE_URL}/reviews`
    }
  },
  PAYMENT: {
    VN_PAY: {
      INDEX: `${BASE_URL}/payment/vnpay`
    }
  },
  REPORT: {
    INDEX: `${BASE_URL}/report`
  },
  NOTIFICATION: {
    INDEX: `${BASE_URL}/notifications`
  },
  APPOINTMENT: {
    INDEX: `${BASE_URL}/appointments`
  },
  UPLOAD: {
    IMAGE: `https://kampa.vn/api/v1.0/upload-image`
  }
}
