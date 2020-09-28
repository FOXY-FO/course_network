import axios from "axios"
import {
  PhotosType,
  ProfileType,
  TProfileEditInfo,
  UserType,
} from "../types/types"

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    "API-KEY": "b6edddc9-bab3-4de4-ba5b-f431953c39b4",
  },
})

type GetUsersType = {
  items: UserType[] | null
  totalCount: number
  error: string | null
}

type FollowUnfollowType = {
  data: {}
  fieldsErrors: string[]
  messages: string[]
  resultCode: ResultCodesEnum
}

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance
      .get<GetUsersType>(`/users?page=${currentPage}&count=${pageSize}`)
      .then((res) => res.data)
  },
  follow(userId: number) {
    return instance.post<FollowUnfollowType>(`/follow/${userId}`)
  },

  unfollow(userId: number) {
    return instance.delete<FollowUnfollowType>(`/follow/${userId}`)
  },
}

type GetUserStatusType = { message: string } | string

type UpdateUserStatusType = {
  data: {}
  messages: string[]
  fieldsErrors: string[]
  resultCode: ResultCodesEnum
}

type UploadPhotoType = {
  data: { photos: PhotosType }
  resultCode: ResultCodesEnum
  messages: string[]
  fieldsErrors: string[]
}

type UpdateProfileInfoType = {
  data: {}
  fieldsErrors: string[]
  messages: string[]
  resultCode: ResultCodesEnum
}

export const profileAPI = {
  getProfile(id: number) {
    return instance.get<ProfileType>(`/profile/${id}`).then((res) => res.data)
  },
  getUserStatus(userId: number) {
    return instance
      .get<GetUserStatusType>(`/profile/status/${userId}`)
      .then((res) => res.data)
  },
  updateUserStatus(status: string) {
    return instance
      .put<UpdateUserStatusType>("/profile/status", { status })
      .then((res) => res.data)
  },
  uploadPhoto(image: any) {
    let formData = new FormData()
    formData.append("image", image)
    return instance
      .put<UploadPhotoType>("/profile/photo", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => res.data)
  },
  updateProfileInfo(info: TProfileEditInfo) {
    return instance
      .put<UpdateProfileInfoType>("/profile", info)
      .then((res) => res.data)
  },
}

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

type GetCaptchaURLType = {
  url: string
}

export const securityAPI = {
  getCaptchaURL() {
    return instance.get<GetCaptchaURLType>("/security/get-captcha-url")
  },
}
