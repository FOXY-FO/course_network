import api from "../api/api"

const ADD_POST = "network/profile-reducer/ADD_POST"
const SET_USER = "network/profile-reducer/SET_USER"
const SET_STATUS = "network/profile-reducer/SET_STATUS"

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
      if (action.newPostText === "" || typeof action.newPostText !== "string")
        return

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

export let getProfileThunk = (userId) => async (dispatch) => {
  let res = await api.profile.getProfile(userId)
  dispatch(setProfile(res))
}
export let getUserStatus = (userId) => async (dispatch) => {
  let status = await api.profile.getUserStatus(userId)
  dispatch(setStatus(status))
}
export let updateUserStatus = (status) => async (dispatch) => {
  let data = await api.profile.updateUserStatus(status)
  if (data.resultCode === 0) {
    dispatch(setStatus(status))
  }
}

export default profileReducer
