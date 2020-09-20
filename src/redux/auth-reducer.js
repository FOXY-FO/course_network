import api from "../api/api"
import { stopSubmit } from "redux-form"

const SET_USER_DATA = "network/auth-reducer/SET_USER_DATA"

let initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
}

let authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
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

export let getUserAuthData = () => async (dispatch) => {
  let res = await api.auth.getCurrentUserProfile()

  if (res.resultCode === 0) {
    let { id, email, login } = res.data
    dispatch(setUserData(id, email, login, true))
  }

  return res
}

export let login = (email, password, rememberMe) => async (dispatch) => {
  let data = await api.auth.login(email, password, rememberMe)

  if (data.resultCode === 0) {
    dispatch(getUserAuthData())
  } else {
    if (data.messages.length && data.messages[0].length) {
      let action = stopSubmit("login", { _error: data.messages[0] })
      dispatch(action)
    }
  }
}

export let logout = () => async (dispatch) => {
  let res = await api.auth.logout()

  if (res.resultCode === 0) {
    dispatch(setUserData(null, null, null, false))
  }
}

export default authReducer
