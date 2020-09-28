import { stopSubmit } from "redux-form"
import { ThunkAction } from "redux-thunk"
import { profileAPI, ResultCodesEnum } from "../api/api"
import {
  PhotosType,
  PostType,
  ProfileType,
  TProfileEditInfo,
} from "../types/types"
import { displayError } from "./app-reducer"
import { AppStateType, InferActionsTypes } from "./redux-store"

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
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "profile/ADD_POST":
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
    case "profile/SET_USER":
      return {
        ...state,
        profile: action.profile,
      }
    case "profile/SET_STATUS":
      return {
        ...state,
        status: action.status,
      }
    case "profile/UPLOAD_PHOTO_SUCCESS":
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

export const actions = {
  addPost: (newPostText: string) =>
    ({
      type: "profile/ADD_POST",
      newPostText,
    } as const),
  setProfile: (profile: ProfileType) =>
    ({
      type: "profile/SET_USER",
      profile,
    } as const),
  setStatus: (status: string) =>
    ({
      type: "profile/SET_STATUS",
      status,
    } as const),
  uploadPhotoSuccess: (photos: PhotosType) =>
    ({
      type: "profile/UPLOAD_PHOTO_SUCCESS",
      photos,
    } as const),
}

type ActionsTypes = InferActionsTypes<typeof actions>

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getProfileThunk = (userId: number): ThunkType => async (
  dispatch
) => {
  const res = await profileAPI.getProfile(userId)
  dispatch(actions.setProfile(res))
}
export const getUserStatus = (userId: number): ThunkType => async (
  dispatch
) => {
  const res = await profileAPI.getUserStatus(userId)
  if (typeof res === "string") {
    dispatch(actions.setStatus(res))
  } else if (typeof res === typeof {}) {
    return Promise.reject(res.message)
  }
}
export const updateUserStatus = (status: string): ThunkType => async (
  dispatch
) => {
  const data = await profileAPI.updateUserStatus(status)
  if (data.resultCode === ResultCodesEnum.Success) {
    dispatch(actions.setStatus(status))
  } else if (data.resultCode === ResultCodesEnum.Error) {
    dispatch(displayError(data.messages[0]))
  }
}
export const uploadPhoto = (image: string): ThunkType => async (dispatch) => {
  const data = await profileAPI.uploadPhoto(image)
  if (data.resultCode === ResultCodesEnum.Success) {
    dispatch(actions.uploadPhotoSuccess(data.data.photos))
  } else if (data.resultCode === ResultCodesEnum.Error) {
    dispatch(displayError(data.messages[0]))
  }
}

const _takePropsFromString = (str: string): string[] => {
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
const _composeObject = (arr: string[], value: string): Object => {
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

export const saveProfile = (info: TProfileEditInfo) => async (
  dispatch: any,
  getState: () => AppStateType
) => {
  const data = await profileAPI.updateProfileInfo(info)
  if (data.resultCode === ResultCodesEnum.Success) {
    dispatch(getProfileThunk(getState().auth.userId!))
  } else {
    const errorMessage = data.messages[0]

    const action = stopSubmit(
      "edit-profile",
      _composeObject(_takePropsFromString(errorMessage), errorMessage)
    )

    dispatch(action)

    return Promise.reject(errorMessage)
  }
}

export default profileReducer
