import { authAPI, securityAPI } from "../api/api"
import { stopSubmit } from "redux-form"

const SET_USER_DATA = "network/auth-reducer/SET_USER_DATA"
const SET_CAPTCHA_URL = "network/auth-reducer/SET_CAPTCHA_URL"

let initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  captchaURL: null,
}

let authReducer = (state = initialState, action) => {
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

export let setUserData = (userId, email, login, isAuth) => ({
  type: SET_USER_DATA,
  payload: {
    userId,
    email,
    login,
    isAuth,
  },
})

export let setCaptchaURL = (captchaURL) => ({
  type: SET_CAPTCHA_URL,
  payload: {
    captchaURL,
  },
})

export let getUserAuthData = () => async (dispatch) => {
  let res = await authAPI.getCurrentUserProfile()

  if (res.resultCode === 0) {
    let { id, email, login } = res.data
    dispatch(setUserData(id, email, login, true))
  }

  return res
}

export let login = (email, password, rememberMe, captcha) => async (
  dispatch,
  getState
) => {
  let data = await authAPI.login(email, password, rememberMe, captcha)

  if (data.resultCode === 0) {
    dispatch(getUserAuthData())
    if (getState().auth.captchaURL) dispatch(setCaptchaURL(null))
  } else {
    if (data.resultCode === 10) {
      dispatch(getCaptchaURL())
    }

    if (data.messages.length && data.messages[0].length) {
      let action = stopSubmit("login", { _error: data.messages[0] })
      dispatch(action)
    }
  }
}

export let logout = () => async (dispatch) => {
  let res = await authAPI.logout()

  if (res.resultCode === 0) {
    dispatch(setUserData(null, null, null, false))
  }
}

export let getCaptchaURL = () => async (dispatch) => {
  let res = await securityAPI.getCaptchaURL()
  let captchaURL = res.data.url
  dispatch(setCaptchaURL(captchaURL))
}

export default authReducer
