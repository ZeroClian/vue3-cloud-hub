import request from '@/utils/request'
import { RoleDto } from './type'
enum API {
  ROLE_LIST_URL = '/acl/roles/',
  ROLE_PAGE_URL = '/acl/role/',
  SAVE_OR_UPDATE_URL = '/acl/role/saveOrUpdate',
  DELETE_ROLES_URL = '/acl/role/delete',
}

export const reqRoles = (id: number) =>
  request.get<any, any>(API.ROLE_LIST_URL + id)
export const reqAllRoles = (page: number, size: number, roleName: string) =>
  request.get<any, any>(
    API.ROLE_PAGE_URL + `${page}/${size}/?roleName=${roleName}`,
  )
export const reqSaveOrUpdateRole = (data: RoleDto) =>
  request.post<any, any>(API.SAVE_OR_UPDATE_URL, data)

export const reqDeleteRoles = (data: number[]) =>
  request.post<any, any>(API.DELETE_ROLES_URL, data)

export const reqSetRolePermissions = (roleId: number, data: number[]) =>
  request.post<any, any>(API.ROLE_PAGE_URL + `${roleId}/setPermissions`, data)
