import { FormAction, stopSubmit } from "redux-form"
import { ResultCodesEnum, ResultCodeForCaptcha } from "../api/api"
import { securityAPI } from "../api/security-api"
import { authAPI, GetCurrentUserProfileResponseType } from "../api/auth-api"
import { InferActionsTypes, BaseThunkType } from "../redux/redux-store"

const initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaURL: null as string | null,
}

const authReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "auth/SET_USER_DATA":
    case "auth/SET_CAPTCHA_URL":
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

export const actions = {
  setUserData: (
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
  ) =>
    ({
      type: "auth/SET_USER_DATA",
      payload: {
        userId,
        email,
        login,
        isAuth,
      },
    } as const),
  setCaptchaURL: (captchaURL: string | null) =>
    ({
      type: "auth/SET_CAPTCHA_URL",
      payload: {
        captchaURL,
      },
    } as const),
}

export const getUserAuthData = (): BaseThunkType<
  ActionsTypes,
  Promise<GetCurrentUserProfileResponseType>
> => async (dispatch) => {
  const res = await authAPI.getCurrentUserProfile()

  if (res.resultCode === 0) {
    const { id, email, login } = res.data
    dispatch(actions.setUserData(id, email, login, true))
  }

  return res.data
}

export const login = (
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: string
): ThunkType => async (dispatch, getState) => {
  const data = await authAPI.login(email, password, rememberMe, captcha)

  if (data.resultCode === ResultCodesEnum.Success) {
    dispatch(getUserAuthData())
    if (getState().auth.captchaURL) dispatch(actions.setCaptchaURL(null))
  } else {
    if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
      dispatch(getCaptchaURL())
    }

    if (data.messages.length && data.messages[0].length) {
      const action = stopSubmit("login", { _error: data.messages[0] })
      dispatch(action)
    }
  }
}

export const logout = (): ThunkType => async (dispatch) => {
  const res = await authAPI.logout()

  if (res.data.resultCode === ResultCodesEnum.Success) {
    dispatch(actions.setUserData(null, null, null, false))
  }
}

export const getCaptchaURL = (): ThunkType => async (dispatch) => {
  const res = await securityAPI.getCaptchaURL()
  const captchaURL = res.data.url
  dispatch(actions.setCaptchaURL(captchaURL))
}

export default authReducer

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>
