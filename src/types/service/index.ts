export type TOptionOfService = {
  title: string
  titleKo: string
  titleJp: string
  titleEn: string
  duration: string
  price: number
}

export type TParamsGetServices = {
  limit?: number
  page?: number
  search?: string
  order?: string
}

export type TParamsCreateService = {
  name: string
  nameKo: string
  nameEn: string
  nameJp: string
  packageId: string
  options: TOptionOfService[]
}

export type TParamsEditService = {
  id: string
  name: string
  nameKo: string
  nameEn: string
  nameJp: string
  packageId: string
  options: TOptionOfService[]
}

export type TParamsDeleteService = {
  id: string
}

export type TParamsDeleteMultipleService = {
  serviceIds: string[]
}

export type TService = {
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
  services: any[]
}