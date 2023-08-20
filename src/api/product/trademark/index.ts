import request from '@/utils/request'
enum API {
  TRADEMARK_URL = '/product/baseTrademark/',
  ADD_TRADEMARK_URL = '/product/baseTrademark/save',
  UPDATE_TRADEMARK_URL = '/product/baseTrademark/update',
  DELETE_TRADEMARK_URL = '/product/baseTrademark/delete',
}
export const reqHasTrademark = (page: number, size: number) =>
  request.get<any, any>(API.TRADEMARK_URL + `${page}/${size}`)

export const reqAddOrUpdateTrademark = (data: any) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATE_TRADEMARK_URL, data)
  } else {
    return request.post<any, any>(API.ADD_TRADEMARK_URL, data)
  }
}

export const reqDeleteTrademark = (id: number) => {
  return request.delete<any, any>(API.DELETE_TRADEMARK_URL + `/${id}`)
}
