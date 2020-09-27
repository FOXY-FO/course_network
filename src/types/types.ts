export type PostType = {
  id: number
  text: string
  likesCount: number
}

export type PhotosType = {
  small: string | null
  large: string | null
}

export type ContactsType = {
  facebook: string | null
  website: string | null
  vk: string | null
  twitter: string | null
  instagram: string | null
  youtube: string | null
  github: string | null
  mainLink: string | null
}

export type ProfileType = {
  userId: number
  aboutMe: string | null
  contacts: ContactsType
  lookingForAJob: boolean
  lookingForAJobDescription: string
  fullName: string
  photos: PhotosType
}

export type TProfileEditInfo = Omit<ProfileType, "userId" | "photos">

export type UserType = {
  name: string
  id: number
  uniqueUrlName: string | null
  photos: PhotosType
  status: string | null
  followed: boolean
}
