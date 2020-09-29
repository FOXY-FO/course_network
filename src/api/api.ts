import axios from "axios"
import { UserType } from "../types/types"

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    "API-KEY": "b6edddc9-bab3-4de4-ba5b-f431953c39b4",
  },
})

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
}

export enum ResultCodeForCaptcha {
  CaptchaIsRequired = 10,
}

export type GetItemsType = {
  items: UserType[] | null
  totalCount: number
  error: string | null
}

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
  data: D
  messages: string[]
  fieldsErrors: string[]
  resultCode: RC
}
