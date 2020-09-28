import {
  authAPI,
  ResultCodesEnum,
  ResultCodeForCaptcha,
  securityAPI,
} from "../api/api"
import { stopSubmit } from "redux-form"
import { AppStateType, InferActionsTypes } from "../redux/redux-store"
import { ThunkAction } from "redux-thunk"
import { Dispatch } from "redux"

const initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaURL: null as string | null,
}

type InitialStateType = typeof initialState

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

type ActionsTypes =
  | InferActionsTypes<typeof actions>
  | ReturnType<typeof stopSubmit>

type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getUserAuthData = () => async (dispatch: DispatchType) => {
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
