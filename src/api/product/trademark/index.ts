import request from '@/utils/request'
enum API {
  TRADEMARK_URL = '/product/baseTrademark/',
}
export const reqHasTrademark = (page: number, size: number) =>
  request.get<any, any>(API.TRADEMARK_URL + `${page}/${size}`)
