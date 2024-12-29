export type TParamsGetPackages = {
  limit?: number
  page?: number
  search?: string
  order?: string
}

export type TParamsCreatePackage = {
  name: string
}

export type TParamsEditPackage = {
  id: string
  name: string
}

export type TParamsDeletePackage = {
  id: string
}

export type TParamsDeleteMultiplePackage = {
  packageIds: string[]
}

export type TPackage = {
  _id: string
  slug: string
  name: string
  nameEn: string
  nameKo: string
  nameJp: string
  image: string
  description: string
  descriptionKo: string
  descriptionJp: string
  descriptionEn: string
}