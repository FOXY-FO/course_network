import { getUserAuthData } from "./auth-reducer"

let INITIALIZING_SUCCESS = "INITIALIZING_SUCCESS"

let initialState = {
  initialized: false,
}

let appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZING_SUCCESS:
      return {
        ...state,
        initialized: true,
      }
    default:
      return state
  }
}

export let initializingSuccess = () => ({ type: INITIALIZING_SUCCESS })

export let initializeApp = () => (dispatch) => {
  let promise = dispatch(getUserAuthData())

  Promise.all([promise]).then(() => {
    dispatch(initializingSuccess())
  })
}

export default appReducer
