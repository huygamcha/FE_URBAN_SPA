// ** Types
import { TItemOrderProduct } from 'src/types/order-product'

// ** Libraries
import { ContentState, EditorState } from 'draft-js'
import htmlToDraft from 'html-to-draftjs'
import { API_ENDPOINT } from 'src/configs/api'

export const toFullName = (lastName: string, middleName: string, firstName: string, language: string) => {
  if (language === 'vi') {
    return `${lastName ? lastName : ''} ${middleName ? middleName : ''} ${firstName ? firstName : ''}`.trim()
  }

  return `${firstName ? firstName : ''} ${middleName ? middleName : ''} ${lastName ? lastName : ''}`.trim()
}

export const convertBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
  })

export const separationFullName = (fullName: string, language: string) => {
  const result = {
    firstName: '',
    middleName: '',
    lastName: ''
  }
  const arrFullName = fullName.trim().split(' ')?.filter(Boolean)
  if (arrFullName?.length === 1) {
    if (language === 'vi') {
      result.firstName = arrFullName.join()
    } else if (language === 'en') {
      result.lastName = arrFullName.join()
    }
  } else if (arrFullName.length === 2) {
    if (language === 'vi') {
      result.lastName = arrFullName[0]
      result.firstName = arrFullName[1]
    } else if (language === 'en') {
      result.lastName = arrFullName[1]
      result.firstName = arrFullName[0]
    }
  } else if (arrFullName.length >= 3) {
    if (language === 'vi') {
      result.lastName = arrFullName[0]
      result.middleName = arrFullName.slice(1, arrFullName.length - 1).join(' ')
      result.firstName = arrFullName[arrFullName.length - 1]
    } else if (language === 'en') {
      result.lastName = arrFullName[arrFullName.length - 1]
      result.middleName = arrFullName.slice(1, arrFullName.length - 1).join(' ')
      result.firstName = arrFullName[0]
    }
  }

  return result
}

export const getAllValueOfObject = (obj: any, arrExlude?: string[]) => {
  try {
    const values: any[] = []
    for (const key in obj) {
      if (typeof obj[key] === 'object') {
        values.push(...getAllValueOfObject(obj[key], arrExlude))
      } else {
        if (!arrExlude?.includes(obj[key])) {
          values.push(obj[key])
        }
      }
    }

    return values
  } catch (error) {
    return []
  }
}

export const formatFilter = (filter: any) => {
  const result: Record<string, string> = {}
  Object.keys(filter)?.forEach((key: string) => {
    if (Array.isArray(filter[key]) && filter[key]?.length > 0) {
      result[key] = filter[key].join('|')
    } else if (filter[key]) {
      result[key] = filter[key]
    }
  })

  return result
}

export const stringToSlug = (str: string) => {
  // remove accents
  const from = 'àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ',
    to = 'aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy'
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(RegExp(from[i], 'gi'), to[i])
  }

  str = str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\-]/g, '-')
    .replace(/-+/g, '-')

  return str
}

export const convertHTMLToDraft = (html: string) => {
  const blocksFromHtml = htmlToDraft(html)
  const { contentBlocks, entityMap } = blocksFromHtml
  const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap)
  const editorState = EditorState.createWithContent(contentState)

  return editorState
}

export const formatNumberToLocal = (value: string | number) => {
  try {
    return Number(value).toLocaleString('vi-VN', {
      minimumFractionDigits: 0
    })
  } catch (error) {
    return value
  }
}

export const cloneDeep = (data: any) => {
  try {
    return JSON.parse(JSON.stringify(data))
  } catch (error) {
    return data
  }
}

export const convertUpdateProductToCart = (orderItems: TItemOrderProduct[], addItem: TItemOrderProduct) => {
  try {
    let result = []
    const cloneOrderItems = cloneDeep(orderItems)
    const findItems = cloneOrderItems.find((item: TItemOrderProduct) => item.product === addItem.product)
    if (findItems) {
      findItems.amount += addItem.amount
    } else {
      cloneOrderItems.push(addItem)
    }
    result = cloneOrderItems.filter((item: TItemOrderProduct) => item.amount)

    return result
  } catch (error) {
    return orderItems
  }
}

export const convertUpdateMultipleProductsCart = (orderItems: TItemOrderProduct[], addItems: TItemOrderProduct[]) => {
  try {
    let result = []

    const cloneOrderItems = cloneDeep(orderItems)
    addItems.forEach(addItem => {
      const findItems = cloneOrderItems.find((item: TItemOrderProduct) => item.product === addItem.product)
      if (findItems) {
        findItems.amount += addItem.amount
      } else {
        cloneOrderItems.push(addItem)
      }
    })
    result = cloneOrderItems.filter((item: TItemOrderProduct) => item.amount)

    return result
  } catch (error) {
    return orderItems
  }
}

export const isExpiry = (startDate: Date | null, endDate: Date | null) => {
  if (startDate && endDate) {
    const currentTime = new Date().getTime()
    const startDateTime = new Date(startDate).getTime()
    const endDateTime = new Date(endDate).getTime()

    return startDateTime <= currentTime && endDateTime > currentTime
  }

  return false
}

export const getTextFromHTML = (data: string) => {
  const container = document.createElement('div')
  container.innerHTML = data

  return container.textContent || container.innerText
}

export const createUrlQuery = (name: string, value: any) => {
  const params = new URLSearchParams()
  params.set(name, value)

  return params.toString()
}

interface IDisplayTextByLanguage {
  language: string
  value: any
  field: string
}
export const displayValueByLanguage = ({ language, value, field }: IDisplayTextByLanguage) => {
  let finalField
  if (language === 'vi') {
    finalField = field
  } else {
    const suffix = language.charAt(0).toUpperCase() + language.slice(1)
    finalField = `${field}${suffix}`
  }

  return value && value[`${finalField}`]
}

export const formatCurrency = (value: string | number) => {
  return `${Number(value).toLocaleString('vi-VN', {
    style: 'currency',
    currency: `VND`
  })}`
}

export const uploadImageToCloud = async (formData: FormData) => {
  try {
    const response = await fetch(`${API_ENDPOINT.UPLOAD.IMAGE}`, {
      method: 'POST',
      body: formData
    })
    const result = await response.json()

    return result
  } catch (error) {
    throw error
  }
}
type TUploadMultipleImage = {
  image: string
}

export const uploadMultipleImage = async (imageCloudflare: TUploadMultipleImage) => {
  try {
    const promiseUploads = Object.keys(imageCloudflare).map(async (key: string) => {
      const itemImage = imageCloudflare[key as keyof TUploadMultipleImage]

      // Gọi API upload
      const response = await fetch(`${API_ENDPOINT.UPLOAD.IMAGE}`, {
        method: 'POST',
        body: itemImage
      })
      const result = await response.json()

      return { [key]: result.data }
    })

    const results = await Promise.all(promiseUploads)

    const final = results.reduce((acc, item) => {
      return { ...acc, ...item }
    }, {})

    return final
  } catch (error) {
    throw error
  }
}

type TUploadMultipleImageBanner = {
  links: string[]
}

export const uploadMultipleImageBanner = async (imageCloudflare: string[]) => {
  try {
    const results: string[] = await Promise.all(
      imageCloudflare.map(async item => {
        const response = await fetch(`${API_ENDPOINT.UPLOAD.IMAGE}`, {
          method: 'POST',
          body: item
        })

        const result = await response.json()

        return result.data
      })
    )

    return results
  } catch (error) {
    throw error
  }
}

export const checkLanguage = (i18n: string, language: string) => {
  if (i18n === language) {
    return true
  }

  return false
}

export const accessLink = (language: string, link: string) => {
  if (language === 'vi') return link

  return `/${language}${link}`
}
