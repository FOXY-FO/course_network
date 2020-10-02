import { FormAction, stopSubmit } from "redux-form"
import { ResultCodesEnum } from "../api/api"
import { profileAPI } from "../api/profile-api"
import {
  PhotosType,
  PostType,
  ProfileType,
  TProfileEditInfo,
} from "../types/types"
import { displayError } from "./app-reducer"
import { BaseThunkType, InferActionsTypes } from "./redux-store"

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
  isProfileInfoEditModeOn: false,
}

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
    case "profile/SET_IS_PROFILE_EDIT_MODE_ON":
      return {
        ...state,
        isProfileInfoEditModeOn: action.value,
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
  setIsProfileEditModeOn: (value: boolean) =>
    ({
      type: "profile/SET_IS_PROFILE_EDIT_MODE_ON",
      value,
    } as const),
}

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
  } else {
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
export const uploadPhoto = (image: File): ThunkType => async (dispatch) => {
  const data = await profileAPI.uploadPhoto(image)
  if (data.resultCode === ResultCodesEnum.Success) {
    dispatch(actions.uploadPhotoSuccess(data.data.photos))
  } else if (data.resultCode === ResultCodesEnum.Error) {
    dispatch(displayError(data.messages[0]))
  }
}

export const saveProfile = (info: TProfileEditInfo): ThunkType => async (
  dispatch,
  getState
) => {
  const data = await profileAPI.updateProfileInfo(info)
  if (data.resultCode === ResultCodesEnum.Success) {
    dispatch(getProfileThunk(getState().auth.userId!))
    dispatch(actions.setIsProfileEditModeOn(false))
  } else {
    const errorMessage = data.messages[0]

    const action = stopSubmit("edit-profile", { _error: errorMessage })

    dispatch(action)

    return Promise.reject(errorMessage)
  }
}

export default profileReducer

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>
