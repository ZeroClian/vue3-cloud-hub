import request from '@/utils/request'
import { UserDto } from './type'
enum API {
  ALLUSER_URL = '/acl/user/',
  SAVEORUPDATE_URL = '/acl/user/saveOrUpdate',
  DELETEUSER_URL = '/acl/user/delete/',
}

export const reqUserList = (page: number, size: number, name: string) =>
  request.get<any, any>(API.ALLUSER_URL + `${page}/${size}?name=${name}`)
export const reqSaveOrUpdateUser = (data: UserDto) =>
  request.post<any, any>(API.SAVEORUPDATE_URL, data)
export const reqDeleteUser = (id: number) =>
  request.delete<any, any>(API.DELETEUSER_URL + `${id}`)
