import axios from "axios"
import { TProfileEditInfo } from "../types/types"

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    "API-KEY": "b6edddc9-bab3-4de4-ba5b-f431953c39b4",
  },
})

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance.get(`/users?page=${currentPage}&count=${pageSize}`)
  },
  follow(userId: number) {
    return instance.post(`/follow/${userId}`)
  },

  unfollow(userId: number) {
    return instance.delete(`/follow/${userId}`)
  },
}

export const profileAPI = {
  getProfile(id: number) {
    return instance.get(`/profile/${id}`)
  },
  getUserStatus(userId: number) {
    return instance.get(`/profile/status/${userId}`)
  },
  updateUserStatus(status: string) {
    return instance.put("/profile/status", { status })
  },
  uploadPhoto(image: any) {
    let formData = new FormData()
    formData.append("image", image)
    return instance.put("/profile/photo", formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
  },
  updateProfileInfo(info: TProfileEditInfo) {
    return instance.put("/profile", info)
  },
}

// properties:
// resultCode (integer) - 0 - OK, 1 - request is invalid
// messages (string[]) - is empty if resultCode is 0, contains error messages if resultCode is different from 0
// data (object) - is empty if resultCode is not equal 0,  if resultCode is 0 then object contains
// * id - logged user id
// * email - logged user email
// * login - user login

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
}

export enum ResultCodeForCaptcha {
  CaptchaIsRequired = 10,
}

type GetCurrentUserProfileResponseType = {
  data: { id: number; email: string; login: string }
  resultCode: ResultCodesEnum
  messages: string[]
}

type LoginResponseType = {
  data: { userId: number }
  resultCode: ResultCodesEnum | ResultCodeForCaptcha
  messages: string[]
}

type LogoutResponseType = {
  resultCode: ResultCodesEnum
}

export const authAPI = {
  getCurrentUserProfile() {
    return instance
      .get<GetCurrentUserProfileResponseType>(`/auth/me`)
      .then((res) => res.data)
  },

  login(
    email: string,
    password: string,
    rememberMe = false,
    captcha: string | null = null
  ) {
    return instance
      .post<LoginResponseType>("/auth/login", {
        email,
        password,
        rememberMe,
        captcha,
      })
      .then((res) => res.data)
  },

  logout() {
    return instance.delete<LogoutResponseType>("/auth/login")
  },
}

export const securityAPI = {
  getCaptchaURL() {
    return instance.get("/security/get-captcha-url")
  },
}
