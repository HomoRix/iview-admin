import axios from '@/libs/api.request'

export const getDappInfoListData = (params) => {
  return axios.request({
    url: 'dappInfo/list.json',
    params: params,
    method: 'get'
  })
}

export const addDappInfo = (params) => {
  return axios.request({
    url: 'dappInfo/add.json',
    params: params,
    method: 'get'
  })
}

export const deleteDappInfo = (params) => {
  return axios.request({
    url: 'dappInfo/delete.json',
    params: params,
    method: 'get'
  })
}

export const updateDappInfo = (params) => {
  return axios.request({
    url: 'dappInfo/update.json',
    params: params,
    method: 'get'
  })
}

export const getTagListData = (params) => {
  return axios.request({
    url: 'tag/list.json',
    params: params,
    method: 'get'
  })
}

export const addTag = (params) => {
  return axios.request({
    url: 'tag/add.json',
    params: params,
    method: 'get'
  })
}

export const deleteTag = (params) => {
  return axios.request({
    url: 'tag/delete.json',
    params: params,
    method: 'get'
  })
}

export const updateTag = (params) => {
  return axios.request({
    url: 'tag/update.json',
    params: params,
    method: 'get'
  })
}

export const getCategoryListData = (params) => {
  return axios.request({
    url: 'category/list.json',
    params: params,
    method: 'get'
  })
}

export const addCategory = (params) => {
  return axios.request({
    url: 'category/add.json',
    params: params,
    method: 'get'
  })
}

export const deleteCategory = (params) => {
  return axios.request({
    url: 'category/delete.json',
    params: params,
    method: 'get'
  })
}

export const updateCategory = (params) => {
  return axios.request({
    url: 'category/update.json',
    params: params,
    method: 'get'
  })
}

export const getTableData = () => {
  return axios.request({
    url: 'get_table_data.json',
    method: 'get'
  })
}

export const getDragList = () => {
  return axios.request({
    url: 'get_drag_list.json',
    method: 'get'
  })
}

export const errorReq = () => {
  return axios.request({
    url: 'error_url.json',
    method: 'post'
  })
}

export const saveErrorLogger = info => {
  return axios.request({
    url: 'save_error_logger.json',
    data: info,
    method: 'post'
  })
}

export const uploadImg = formData => {
  return axios.request({
    url: 'image/upload.json',
    data: formData
  })
}
