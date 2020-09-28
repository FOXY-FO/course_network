import { ThunkAction } from "redux-thunk"
import { getUserAuthData } from "./auth-reducer"
import { AppStateType, InferActionsTypes } from "./redux-store"

const initialState = {
  initialized: false,
  globalError: null as string | null,
}

type InitialStateType = typeof initialState

const appReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "app/INITIALIZING_SUCCESS":
      return {
        ...state,
        initialized: true,
      }
    case "app/SET_GLOBAL_ERROR":
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

export const actions = {
  initializingSuccess: () =>
    ({
      type: "app/INITIALIZING_SUCCESS",
    } as const),
  setErrorMessage: (globalError: string | null) =>
    ({
      type: "app/SET_GLOBAL_ERROR",
      payload: { globalError },
    } as const),
}

type ActionsTypes = InferActionsTypes<typeof actions>

export const initializeApp = (): ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionsTypes
> => async (dispatch) => {
  const promise = dispatch(getUserAuthData())
  await Promise.all([promise])
  dispatch(actions.initializingSuccess())
}
export const displayError = (
  error: string | null
): ThunkAction<void, AppStateType, unknown, ActionsTypes> => (dispatch) => {
  dispatch(actions.setErrorMessage(error))
  setTimeout(() => {
    dispatch(actions.setErrorMessage(null))
  }, 10000)
}

export default appReducer
