export type TParamsGetBanners = {
  limit?: number
  page?: number
  search?: string
  order?: string
}

export type TParamsCreateBanner = {
  links: string[]
}

export type TParamsEditBanner = {
  id: string
  name: string
  nameKo: string,
  nameEn: string,
  nameJp: string,
  description: string,
  descriptionKo: string,
  descriptionEn: string,
  descriptionJp: string,
  image: string,
  slug: string
}

export type TParamsDeleteBanner = {
  id: string
}

export type TParamsDeleteMultipleBanner = {
  bannerIds: string[]
}

export type TBanner = {
  _id: string
  link: string
}