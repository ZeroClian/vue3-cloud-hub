import request from '@/utils/request'
import { RoleDto } from './type'
enum API {
  ROLE_LIST_URL = '/acl/roles/',
  ROLE_PAGE_URL = '/acl/role/',
  SAVE_OR_UPDATE_URL = '/acl/saveOrUpdate',
}

export const reqRoles = (id: number) =>
  request.get<any, any>(API.ROLE_LIST_URL + id)
export const reqAllRoles = (page: number, size: number, roleName: string) =>
  request.get<any, any>(
    API.ROLE_PAGE_URL + `${page}/${size}/?roleName=${roleName}`,
  )
export const reqSaveOrUpdateRole = (data: RoleDto) =>
  request.post<any, any>(API.SAVE_OR_UPDATE_URL, data)
