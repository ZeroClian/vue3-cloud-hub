import request from '@/utils/request'

enum API {
  PERMISSION_TREE_URL = '/acl/permission/tree',
  GET_ROLE_PERMISSION_URL = '/acl/permission/',
  SAVE_OR_UPDATE_PERMISSION_URL = '/acl/permission/saveOrUpdate',
}

export const reqPermissionTree = () =>
  request.get<any, any>(API.PERMISSION_TREE_URL)
export const reqRolePermissions = (roleId: number) =>
  request.get<any, any>(API.GET_ROLE_PERMISSION_URL + `${roleId}`)
export const reqSaveOrUpdatePermission = (data: any) =>
  request.post<any, any>(API.SAVE_OR_UPDATE_PERMISSION_URL, data)
export const reqDeletePermission = (id: number) =>
  request.delete<any, any>(API.GET_ROLE_PERMISSION_URL + `${id}`)
