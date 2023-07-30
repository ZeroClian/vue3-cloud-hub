import request from '@/utils/request'
enum API {
  LOGIN_URL = '/user/login',
  USERINFO_URL = '/user/info',
}

export const reqLogin = (data: any) =>
  request.post<any, any>(API.LOGIN_URL, data)
export const reqUserInfo = () => request.get<any, any>(API.USERINFO_URL)
