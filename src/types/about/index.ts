export type TParamsGetAbouts = {
  limit?: number
  page?: number
  search?: string
  order?: string
  cityId?: string
}

export type TParamsCreateAbout = {
  name: string
  slug: string
  nameKo: string
}

export type TParamsEditAbout = {
  id: string
  nameKo: string
  nameEn: string
  nameJp: string
  name: string
}

export type TParamsDeleteAbout = {
  id: string
}

export type TParamsDeleteMultipleAbouts = {
  aboutIds: string[]
}

export type TParamsAirPort = {
  label: string
  value: string
}

export type TParamsFetchAbout = {
  name: string
  nameKo: string
  nameEn: string
  nameJp: string
  _id: string
}
