import request from '@/utils/request'
enum API {
  SEARCH_DATA_URL = '/search_data/query',
}

export const reqSearchData = (key: string) =>
  request.get<any, any>(API.SEARCH_DATA_URL + `?key=${key}`)
