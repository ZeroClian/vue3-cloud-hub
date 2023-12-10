import request from '@/utils/request'

enum API {
  CATEGORY_URL = '/category/',
  ATTR_URL = '/attribute/',
  ADDORUPDATEATTR_URL = '/attribute/save',
}

export const reqCategoryList = (categoryId: number | string) =>
  request.get<any, any>(API.CATEGORY_URL + categoryId)
export const reqAttrList = (categoryId: number | string) =>
  request.get<any, any>(API.ATTR_URL + categoryId)
export const reqAddOrUpdateAttr = (data: any) =>
  request.post<any, any>(API.ADDORUPDATEATTR_URL, data)
export const reqDeleteAttr = (attrId: number | string) =>
  request.delete<any, any>(API.ATTR_URL + attrId)
