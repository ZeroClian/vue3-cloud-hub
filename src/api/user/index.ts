import request from '@/utils/request'
enum API {
  LOGIN_URL = '/index/login',
  USERINFO_URL = '/index/info',
  LOGOUT_URL = '/index/logout',
}

export const reqLogin = (data: any) =>
  request.post<any, any>(API.LOGIN_URL, data)
export const reqUserInfo = () => request.get<any, any>(API.USERINFO_URL)
export const reqLogout = () => request.get<any, any>(API.LOGOUT_URL)
