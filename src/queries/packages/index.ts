import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query'
import { queryKeys } from 'src/configs/queryKey'
import { getAllPackages } from 'src/services/packages'

// ** Services

// ** Types
import { TParamsEditPackage, TParamsGetPackages } from 'src/types/package'

export const useGetListPackages = (
  params: TParamsGetPackages,
  options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: [queryKeys.package_list, params.order, params.search, params.limit, params.page],
    queryFn: async () => {
      const res = await getAllPackages({ params: { ...params } })

      return res.data
    },
    ...options
  })
}
