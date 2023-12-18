import request from '@/utils/request'
import { UserDto } from './type'
enum API {
  ALLUSER_URL = '/acl/user/',
  SAVEORUPDATE_URL = '/acl/user/saveOrUpdate',
  DELETEUSER_URL = '/acl/user/delete/',
  UPDATEROLES_URL = '/acl/user/roles/update',
  BATCHDELETEUSER_URL = '/acl/user/batch/delete',
}

export const reqUserList = (page: number, size: number, name: string) =>
  request.get<any, any>(API.ALLUSER_URL + `${page}/${size}?name=${name}`)
export const reqSaveOrUpdateUser = (data: UserDto) =>
  request.post<any, any>(API.SAVEORUPDATE_URL, data)
export const reqDeleteUser = (id: number) =>
  request.delete<any, any>(API.DELETEUSER_URL + `${id}`)
export const reqBatchDeleteUser = (ids: number[]) =>
  request.post<any, any>(API.BATCHDELETEUSER_URL, ids)
export const reqUpdateUserRoles = (data: any) =>
  request.post<any, any>(API.UPDATEROLES_URL, data)
