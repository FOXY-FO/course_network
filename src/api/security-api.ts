import { instance } from "./api"

type GetCaptchaURLType = {
  url: string
}

export const securityAPI = {
  getCaptchaURL() {
    return instance.get<GetCaptchaURLType>("/security/get-captcha-url")
  },
}
