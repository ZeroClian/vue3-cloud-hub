export interface loginForm {
  username: string
  password: string
}

interface dataType {
  token: string
}

export interface loginResponseData {
  code: string
  data: dataType
}

interface userInfo {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: string[]
  buttons: string[]
  routes: string[]
  token: string
}

export interface userResponseData {
  code: string
  checkUser: userInfo
}
