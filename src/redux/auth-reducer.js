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
        userId: action.userId,
        email: action.email,
        login: action.login,
        isAuth: true,
      }
    default:
      return state
  }
}

export let setUserData = (userId, email, login) => ({
  type: SET_USER_DATA,
  userId,
  email,
  login,
})

export default authReducer
