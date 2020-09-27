import { authAPI, securityAPI } from "../api/api"
import { stopSubmit } from "redux-form"

const SET_USER_DATA = "network/auth-reducer/SET_USER_DATA"
const SET_CAPTCHA_URL = "network/auth-reducer/SET_CAPTCHA_URL"

// export type InitialStateType2 = {
//   userId: number | null
//   email: string | null
//   login: string | null
//   isAuth: boolean
//   captchaURL: string | null
// }

const initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaURL: null as string | null,
}

type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case SET_USER_DATA:
    case SET_CAPTCHA_URL:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

type SetUserDataActionPayloadType = {
  userId: number | null
  email: string | null
  login: string | null
  isAuth: boolean
}
type SetUserDataActionType = {
  type: typeof SET_USER_DATA
  payload: SetUserDataActionPayloadType
}
export const setUserData = (
  userId: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean
): SetUserDataActionType => ({
  type: SET_USER_DATA,
  payload: {
    userId,
    email,
    login,
    isAuth,
  },
})
type SetCaptchaURLActionType = {
  type: typeof SET_CAPTCHA_URL
  payload: { captchaURL: string | null }
}
export const setCaptchaURL = (
  captchaURL: string | null
): SetCaptchaURLActionType => ({
  type: SET_CAPTCHA_URL,
  payload: {
    captchaURL,
  },
})

export const getUserAuthData = () => async (dispatch: any) => {
  const res = await authAPI.getCurrentUserProfile()

  if (res.resultCode === 0) {
    const { id, email, login } = res.data
    dispatch(setUserData(id, email, login, true))
  }

  return res
}

export const login = (
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: string
) => async (dispatch: any, getState: any) => {
  const data = await authAPI.login(email, password, rememberMe, captcha)

  if (data.resultCode === 0) {
    dispatch(getUserAuthData())
    if (getState().auth.captchaURL) dispatch(setCaptchaURL(null))
  } else {
    if (data.resultCode === 10) {
      dispatch(getCaptchaURL())
    }

    if (data.messages.length && data.messages[0].length) {
      const action = stopSubmit("login", { _error: data.messages[0] })
      dispatch(action)
    }
  }
}

export const logout = () => async (dispatch: any) => {
  const res = await authAPI.logout()

  if (res.resultCode === 0) {
    dispatch(setUserData(null, null, null, false))
  }
}

export const getCaptchaURL = () => async (dispatch: any) => {
  const res = await securityAPI.getCaptchaURL()
  const captchaURL = res.data.url
  dispatch(setCaptchaURL(captchaURL))
}

export default authReducer
