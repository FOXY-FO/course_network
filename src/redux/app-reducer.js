import { getUserAuthData } from "./auth-reducer"

const INITIALIZING_SUCCESS = "network/app-reducer/INITIALIZING_SUCCESS"

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

export let initializeApp = () => async (dispatch) => {
  let promise = dispatch(getUserAuthData())
  await Promise.all([promise])
  dispatch(initializingSuccess())
}

export default appReducer
