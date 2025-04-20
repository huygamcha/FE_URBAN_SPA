export type TParamsGetBlogs = {
  limit?: number
  page?: number
  search?: string
  order?: string
}

export type TParamsCreateBlog = {
  name: string
  nameKo: string
  nameEn: string
  nameJp: string
  description: string
  descriptionKo: string
  descriptionEn: string
  descriptionJp: string
  slug: string
  thumbnail: string
}

export type TParamsEditBlog = {
  id: string
  name: string
  nameKo: string
  nameEn: string
  nameJp: string
  description: string
  descriptionKo: string
  descriptionEn: string
  descriptionJp: string
  slug: string
  thumbnail: string
}

export type TParamsDeleteBlog = {
  id: string
}

export type TParamsDeleteMultipleBlog = {
  blogIds: string[]
}

export type TBlog = {
  _id: string
  link: string
}
