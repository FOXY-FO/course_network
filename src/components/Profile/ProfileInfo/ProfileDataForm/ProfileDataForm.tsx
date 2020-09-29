import React, { FC } from "react"
import { InjectedFormProps, reduxForm } from "redux-form"
import s from "../../../UI/FormControls/FormControls.module.scss"
import { createField } from "../../../UI/FormControls/FormControls"
import {
  required,
  maxLengthCreator,
  minLengthCreator,
} from "../../../../utils/validators"
import { ProfileType, TProfileEditInfo } from "../../../../types/types"
import Input from "../../../UI/FormControls/Input/Input"
import Textarea from "../../../UI/FormControls/Textarea/Textarea"

const maxLength200 = maxLengthCreator(200)
const maxLength10000 = maxLengthCreator(10000)
const maxLength30000 = maxLengthCreator(30000)
const minLength1 = minLengthCreator(1)

type OwnProps = {
  profile: ProfileType
}

const ProfileDataForm: FC<
  InjectedFormProps<TProfileEditInfo, OwnProps> & OwnProps
> = ({ handleSubmit, profile, error }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <button type="submit">save</button>
      </div>
      {error && <div className={s.formSummaryError}>{error}</div>}
      <div>
        <b>Name:</b>{" "}
        {createField(
          "Enter your name",
          "fullName",
          [required, maxLength200, minLength1],
          Input
        )}
      </div>
      <div>
        <b>About me:</b>{" "}
        {createField(
          "Type the informatino about you",
          "aboutMe",
          [maxLength30000],
          Textarea
        )}
      </div>
      <div>
        <b>Looking for a job:</b>{" "}
        {createField("", "lookingForAJob", [], Input, {
          type: "checkbox",
        })}
      </div>
      <div>
        <b>Skills:</b>{" "}
        {createField(
          "Tell about your working skills",
          "lookingForAJobDescription",
          [maxLength10000, required],
          Textarea
        )}
      </div>

      <div>
        <div>Contacts: </div>
        {Object.keys(profile.contacts).map((key) => (
          <div key={key}>
            <b>{key}:</b>{" "}
            {createField(
              "Enter the network link",
              `contacts.${key}`,
              [maxLength200],
              Input
            )}
          </div>
        ))}
      </div>
    </form>
  )
}

export default reduxForm<TProfileEditInfo, OwnProps>({
  form: "edit-profile",
})(ProfileDataForm)
