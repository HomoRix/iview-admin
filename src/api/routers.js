import axios from '@/libs/api.request'

export const getRouterReq = (access) => {
  return axios.request({
    url: 'get_router.json',
    params: {
      access
    },
    method: 'get'
  })
}
