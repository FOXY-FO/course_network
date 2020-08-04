import api from "../api/api"

let SET_USER_DATA = "SET_USER_DATA"

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

export let getUserAuthData = () => (dispatch) => {
  api.auth.getCurrentUserProfile().then((res) => {
    if (res.resultCode === 0) {
      let { id, email, login } = res.data

      dispatch(setUserData(id, email, login, true))
    }
  })
}

export let login = (email, password, rememberMe) => (dispatch) => {
  api.auth.login(email, password, rememberMe).then((data) => {
    if (data.resultCode === 0) {
      dispatch(getUserAuthData())
    }
  })
}

export let logout = () => (dispatch) => {
  api.auth.logout().then((res) => {
    if (res.resultCode === 0) {
      dispatch(setUserData(null, null, null, false))
    }
  })
}

export default authReducer
