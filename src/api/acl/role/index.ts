import request from '@/utils/request'
enum API {
  ROLELIST_URL = '/acl/roles/',
}

export const reqRoles = (id: number) =>
  request.get<any, any>(API.ROLELIST_URL + id)
