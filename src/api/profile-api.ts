import { instance, APIResponseType } from "./api"
import { PhotosType, ProfileType, TProfileEditInfo } from "../types/types"

type GetUserStatusType = { message: string } | string

type UploadPhotoType = { photos: PhotosType }

export const profileAPI = {
  getProfile(id: number) {
    return instance.get<ProfileType>(`/profile/${id}`).then((res) => res.data)
  },
  getUserStatus(userId: number) {
    return instance
      .get<GetUserStatusType>(`/profile/status/${userId}`)
      .then((res) => res.data)
  },
  updateUserStatus(status: string) {
    return instance
      .put<APIResponseType>("/profile/status", { status })
      .then((res) => res.data)
  },
  uploadPhoto(image: File) {
    const formData = new FormData()
    formData.append("image", image)
    return instance
      .put<APIResponseType<UploadPhotoType>>("/profile/photo", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => res.data)
  },
  updateProfileInfo(info: TProfileEditInfo) {
    return instance
      .put<APIResponseType>("/profile", info)
      .then((res) => res.data)
  },
}
