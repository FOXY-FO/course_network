const SET_ERROR_MESSAGE = "error-reducer/SET_ERROR_MESSAGE"

const initialState = {
  errorMessage: null,
}

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERROR_MESSAGE:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

export const setErrorMessage = (errorMessage) => ({
  type: SET_ERROR_MESSAGE,
  payload: { errorMessage },
})

export const displayError = (error) => (dispatch) => {
  dispatch(setErrorMessage(error))
  setTimeout(() => {
    dispatch(setErrorMessage(null))
  }, 10000)
}

export default errorReducer
