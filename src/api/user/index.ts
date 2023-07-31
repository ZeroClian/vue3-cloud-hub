import request from '@/utils/request'
import { loginFormData, loginResponseData, userInfoResponseData } from './type'
enum API {
  LOGIN_URL = '/index/login',
  USERINFO_URL = '/index/info',
  LOGOUT_URL = '/index/logout',
}

export const reqLogin = (data: loginFormData) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data)
export const reqUserInfo = () =>
  request.get<any, userInfoResponseData>(API.USERINFO_URL)
export const reqLogout = () => request.get<any, any>(API.LOGOUT_URL)
