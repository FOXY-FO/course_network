import {
  instance,
  ResultCodesEnum,
  ResultCodeForCaptcha,
  APIResponseType,
} from "./api"

export type GetCurrentUserProfileResponseType = {
  id: number
  email: string
  login: string
}

type LoginResponseType = { userId: number }

export const authAPI = {
  getCurrentUserProfile() {
    return instance
      .get<APIResponseType<GetCurrentUserProfileResponseType>>(`/auth/me`)
      .then((res) => res.data)
  },

  login(
    email: string,
    password: string,
    rememberMe = false,
    captcha: string | null = null
  ) {
    return instance
      .post<
        APIResponseType<
          LoginResponseType,
          ResultCodesEnum | ResultCodeForCaptcha
        >
      >("/auth/login", {
        email,
        password,
        rememberMe,
        captcha,
      })
      .then((res) => res.data)
  },

  logout() {
    return instance.delete<APIResponseType>("/auth/login")
  },
}
