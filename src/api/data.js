import axios from '@/libs/api.request'

export const getDappInfoListData = (params) => {
  return axios.request({
    url: 'dappInfo/list.json',
    params: params,
    method: 'get'
  })
}

export const addDappInfo = (info) => {
  return axios.request({
    url: 'dappInfo/add.json',
    data: info,
    method: 'post'
  })
}

export const deleteDappInfo = (params) => {
  return axios.request({
    url: 'dappInfo/delete.json',
    params: params,
    method: 'get'
  })
}

export const updateDappInfo = (info) => {
  return axios.request({
    url: 'dappInfo/update.json',
    data: info,
    method: 'post'
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

export const getDappUpdateApplicationListData = (params) => {
  return axios.request({
    url: 'dappUpdateApplication/list.json',
    params: params,
    method: 'get'
  })
}

export const addDappUpdateApplication = (dappUpdateApplication) => {
  return axios.request({
    url: 'dappUpdateApplication/add.json',
    data: dappUpdateApplication,
    method: 'post'
  })
}

export const deleteDappUpdateApplication = (params) => {
  return axios.request({
    url: 'dappUpdateApplication/delete.json',
    params: params,
    method: 'get'
  })
}

export const updateDappUpdateApplication = (dappUpdateApplication) => {
  return axios.request({
    url: 'dappUpdateApplication/update.json',
    data: dappUpdateApplication,
    method: 'post'
  })
}

export const getDappPromotedApplicationListData = (params) => {
  return axios.request({
    url: 'dappPromotedApplication/list.json',
    params: params,
    method: 'get'
  })
}

export const addDappPromotedApplication = (dappPromotedApplication) => {
  return axios.request({
    url: 'dappPromotedApplication/add.json',
    data: dappPromotedApplication,
    method: 'post'
  })
}

export const deleteDappPromotedApplication = (params) => {
  return axios.request({
    url: 'dappPromotedApplication/delete.json',
    params: params,
    method: 'get'
  })
}

export const updateDappPromotedApplication = (dappPromotedApplication) => {
  return axios.request({
    url: 'dappPromotedApplication/update.json',
    data: dappPromotedApplication,
    method: 'post'
  })
}

export const getSubscriberListData = (params) => {
  return axios.request({
    url: 'subscriber/list.json',
    params: params,
    method: 'get'
  })
}

export const addSubscriber = (subscriber) => {
  return axios.request({
    url: 'subscriber/add.json',
    data: subscriber,
    method: 'post'
  })
}

export const deleteSubscriber = (params) => {
  return axios.request({
    url: 'subscriber/delete.json',
    params: params,
    method: 'get'
  })
}

export const updateSubscriber = (subscriber) => {
  return axios.request({
    url: 'subscriber/update.json',
    data: subscriber,
    method: 'post'
  })
}

export const getSuggestionSubmitListData = (params) => {
  return axios.request({
    url: 'suggestionSubmit/list.json',
    params: params,
    method: 'get'
  })
}

export const addSuggestionSubmit = (suggestionSubmit) => {
  return axios.request({
    url: 'suggestionSubmit/add.json',
    data: suggestionSubmit,
    method: 'post'
  })
}

export const deleteSuggestionSubmit = (params) => {
  return axios.request({
    url: 'suggestionSubmit/delete.json',
    params: params,
    method: 'get'
  })
}

export const updateSuggestionSubmit = (suggestionSubmit) => {
  return axios.request({
    url: 'suggestionSubmit/update.json',
    data: suggestionSubmit,
    method: 'post'
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
