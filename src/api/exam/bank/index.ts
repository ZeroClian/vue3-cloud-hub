import request from '@/utils/request'
enum API {
  PAGE_URL = '/search_data/page/',
  SAVE_OR_UPDATE_URL = '/search_data/saveOrUpdate',
  DELETE_URL = '/search_data/delete/',
}

export const reqPageQuestion = (page: number, size: number) =>
  request.get<any, any>(API.PAGE_URL + `${page}/${size}`)
export const reqSaveOrUpdateQuestion = (data: any) =>
  request.post<any, any>(API.SAVE_OR_UPDATE_URL, data)
export const reqDeleteQuestion = (id: number) =>
  request.delete(API.DELETE_URL + `${id}`)
