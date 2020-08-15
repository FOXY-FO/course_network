import api from "../api/api"

let ADD_POST = "ADD_POST"
let SET_USER = "SET_USER"
let SET_STATUS = "SET_STATUS"

let initialState = {
  posts: [
    {
      id: 1,
      text: "Hey, what's up?!",
      likesCount: 13,
    },
    {
      id: 2,
      text: "What up!",
      likesCount: 1323,
    },
  ],
  profile: null,
  status: "",
}

let profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      if (action.newPostText === "") return

      let newPost = {
        id: state.posts[state.posts.length - 1].id + 1,
        text: action.newPostText,
        likesCount: 0,
      }

      return {
        ...state,
        posts: [...state.posts, newPost],
      }
    case SET_USER:
      return {
        ...state,
        profile: action.profile,
      }
    case SET_STATUS:
      return {
        ...state,
        status: action.status,
      }
    default:
      return state
  }
}
export let addPost = (newPostText) => ({
  type: ADD_POST,
  newPostText,
})
export let setProfile = (profile) => ({ type: SET_USER, profile })
export let setStatus = (status) => ({ type: SET_STATUS, status })

export let getProfileThunk = (userId) => (dispatch) => {
  api.profile.getProfile(userId).then((res) => {
    dispatch(setProfile(res))
  })
}
export let getUserStatus = (userId) => (dispatch) => {
  api.profile.getUserStatus(userId).then((status) => {
    dispatch(setStatus(status))
  })
}
export let updateUserStatus = (status) => (dispatch) => {
  api.profile.updateUserStatus(status).then((data) => {
    if (data.resultCode === 0) {
      dispatch(setStatus(status))
    }
  })
}

export default profileReducer
