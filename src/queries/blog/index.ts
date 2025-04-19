import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query'
import { queryKeys } from 'src/configs/queryKey'
import { getAllBlogs, updateBlog } from 'src/services/blog'
import { TParamsEditBlog, TParamsGetBlogs } from 'src/types/blog'

// ** Services

// ** Types

export const useGetListBlogs = (
  params: TParamsGetBlogs,
  options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: [queryKeys.blog_list, params.order, params.search, params.limit, params.page],
    queryFn: async () => {
      const res = await getAllBlogs({ params: { ...params } })

      return res.data
    },
    ...options
  })
}

export const useMutationEditBlog = (
  options?: Omit<UseMutationOptions<any, unknown, TParamsEditBlog>, 'mutationKey' | 'mutationFn'>
) => {
  return useMutation({
    mutationFn: async data => {
      const res = await updateBlog(data)

      return res.data
    },
    mutationKey: [queryKeys.blog_update],
    ...options
  })
}
