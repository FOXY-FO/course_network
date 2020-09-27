import { ThunkAction } from "redux-thunk"
import { getUserAuthData } from "./auth-reducer"
import { AppStateType } from "./redux-store"

const INITIALIZING_SUCCESS = "network/app-reducer/INITIALIZING_SUCCESS"
const SET_GLOBAL_ERROR = "network/app-reducer/SET_GLOBAL_ERROR"

const initialState = {
  initialized: false,
  globalError: null as string | null,
}

type InitialStateType = typeof initialState

const appReducer = (
  state = initialState,
  action: ActionTypes
): InitialStateType => {
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

type ActionTypes = InitializingSuccessActionType | SetErrorMessageActionType

type InitializingSuccessActionType = {
  type: typeof INITIALIZING_SUCCESS // 'INITIALIZING_SUCCESS'
}
export const initializingSuccess = (): InitializingSuccessActionType => ({
  type: INITIALIZING_SUCCESS,
})
export type SetErrorMessageActionType = {
  type: typeof SET_GLOBAL_ERROR
  payload: {
    globalError: string | null
  }
}
export const setErrorMessage = (
  globalError: string | null
): SetErrorMessageActionType => ({
  type: SET_GLOBAL_ERROR,
  payload: { globalError },
})

export const initializeApp = (): ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionTypes
> => async (dispatch) => {
  const promise = dispatch(getUserAuthData())
  await Promise.all([promise])
  dispatch(initializingSuccess())
}
export const displayError = (
  error: string | null
): ThunkAction<void, AppStateType, unknown, ActionTypes> => (dispatch) => {
  dispatch(setErrorMessage(error))
  setTimeout(() => {
    dispatch(setErrorMessage(null))
  }, 10000)
}

export default appReducer
