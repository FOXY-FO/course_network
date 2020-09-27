import { stopSubmit } from "redux-form"
import { profileAPI } from "../api/api"
import { PhotosType, PostType, ProfileType } from "../types/types"

const ADD_POST = "network/profile-reducer/ADD_POST"
const SET_USER = "network/profile-reducer/SET_USER"
const SET_STATUS = "network/profile-reducer/SET_STATUS"
const UPLOAD_PHOTO_SUCCESS = "network/profile-reducer/UPLOAD_PHOTO_SUCCESS"

const initialState = {
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
  ] as PostType[],
  profile: null as ProfileType | null,
  status: "",
}

type InitialStateType = typeof initialState

const profileReducer = (
  state = initialState,
  action: any
): InitialStateType => {
  switch (action.type) {
    case ADD_POST:
      if (action.newPostText === "") return state

      const newPost: PostType = {
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
    case UPLOAD_PHOTO_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          photos: action.photos,
        } as ProfileType,
      }
    default:
      return state
  }
}

type AddPostActionType = {
  type: typeof ADD_POST
  newPostText: string
}

export const addPost = (newPostText: string): AddPostActionType => ({
  type: ADD_POST,
  newPostText,
})
type SetProfileActionType = {
  type: typeof SET_USER
  profile: ProfileType
}
export const setProfile = (profile: ProfileType): SetProfileActionType => ({
  type: SET_USER,
  profile,
})
type SetStatusActionType = {
  type: typeof SET_STATUS
  status: string
}
export const setStatus = (status: string): SetStatusActionType => ({
  type: SET_STATUS,
  status,
})
type UploadPhotoSuccessActionType = {
  type: typeof UPLOAD_PHOTO_SUCCESS
  photos: PhotosType
}
export const uploadPhotoSuccess = (
  photos: PhotosType
): UploadPhotoSuccessActionType => ({
  type: UPLOAD_PHOTO_SUCCESS,
  photos,
})

export const getProfileThunk = (userId: number) => async (dispatch: any) => {
  const res = await profileAPI.getProfile(userId)
  dispatch(setProfile(res))
}
export const getUserStatus = (userId: number) => async (dispatch: any) => {
  const status = await profileAPI.getUserStatus(userId)
  dispatch(setStatus(status))
}
export const updateUserStatus = (status: string) => async (dispatch: any) => {
  const data = await profileAPI.updateUserStatus(status)
  if (data.resultCode === 0) {
    dispatch(setStatus(status))
  }
}
export const uploadPhoto = (image: string) => async (dispatch: any) => {
  const res = await profileAPI.uploadPhoto(image)
  if (res.data.resultCode === 0) {
    dispatch(uploadPhotoSuccess(res.data.data.photos))
  }
}

function takePropsFromString(str: string): string[] {
  const strArray = str.split("")
  const leftBound = strArray.indexOf("(")
  const rightBound = strArray.indexOf(")")
  return strArray
    .filter((char, index) => index > leftBound && index < rightBound)
    .join("")
    .split("->")
    .map((prop) => {
      const firstChar = prop.charAt(0).toLowerCase()
      const propCopy = prop.split("")
      propCopy[0] = firstChar
      return propCopy.join("")
    })
}

//********SHITCODE STARTS******************SHIIIIIIIIIIIT COOOOOOOODEEEE!!!!!!!!!! MUST EDIT THIS SHIT LATER!!!!!!!!!!!!!!!!!
function composeObject(arr: string[], value: string) {
  const result = arr.reduce((acc, item, index, array) => {
    if (array.length === 1) {
      return { [item]: value }
    }

    if (index === array.length - 1) {
      return { [array[index - 1]]: { [item]: value } }
    }

    if (index === 0) return { [item]: {} }

    return { [array[index - 1]]: { [item]: {} } }
  }, {})

  return result
}
//**********SHITCODE ENDS*************SHIIIIIIIIIIIT COOOOOOOODEEEE!!!!!!!!!! MUST EDIT THIS SHIT LATER!!!!!!!!!!!!!!!!!

export const saveProfile = (info: any) => async (
  dispatch: any,
  getState: any
) => {
  const res = await profileAPI.updateProfileInfo(info)
  if (res.data.resultCode === 0) {
    dispatch(getProfileThunk(getState().auth.userId))
  } else {
    const errorMessage = res.data.messages[0]

    dispatch(
      stopSubmit(
        "edit-profile",
        composeObject(takePropsFromString(errorMessage), errorMessage)
      )
    )

    return Promise.reject(errorMessage)
  }
}

export default profileReducer
