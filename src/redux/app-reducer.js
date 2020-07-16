let SET_CURRENT_USER = "SET_CURRENT_USER"

let initialState = {
  currentUser: {},
}

let appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: { ...action.payload },
      }
    default:
      return state
  }
}

export let setCurrentUser = (data) => ({
  type: SET_CURRENT_USER,
  payload: data,
})

export default appReducer
