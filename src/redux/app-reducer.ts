import { getUserAuthData } from "./auth-reducer"

const INITIALIZING_SUCCESS = "network/app-reducer/INITIALIZING_SUCCESS"
const SET_GLOBAL_ERROR = "network/app-reducer/SET_GLOBAL_ERROR"

const initialState = {
  initialized: false,
  globalError: null as string | null,
}

type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case INITIALIZING_SUCCESS:
      return {
        ...state,
        initialized: true,
      }
    case SET_GLOBAL_ERROR:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

type InitializingSuccessActionType = {
  type: typeof INITIALIZING_SUCCESS // 'INITIALIZING_SUCCESS'
}
export const initializingSuccess = (): InitializingSuccessActionType => ({
  type: INITIALIZING_SUCCESS,
})
type SetErrorMessageActionPayloadType = {
  globalError: string | null
}
export type SetErrorMessageActionType = {
  type: typeof SET_GLOBAL_ERROR
  payload: SetErrorMessageActionPayloadType
}
export const setErrorMessage = (
  globalError: string | null
): SetErrorMessageActionType => ({
  type: SET_GLOBAL_ERROR,
  payload: { globalError },
})

export let initializeApp = () => async (dispatch: any) => {
  let promise = dispatch(getUserAuthData())
  await Promise.all([promise])
  dispatch(initializingSuccess())
}
export const displayError = (error: string | null) => (dispatch: any) => {
  dispatch(setErrorMessage(error))
  setTimeout(() => {
    dispatch(setErrorMessage(null))
  }, 10000)
}

export default appReducer
