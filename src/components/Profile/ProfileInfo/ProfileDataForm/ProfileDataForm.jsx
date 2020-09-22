import React from "react"
import { reduxForm } from "redux-form"
import { createField } from "../../../UI/FormControls/FormControls"
import {
  required,
  maxLengthCreator,
  minLengthCreator,
} from "../../../../utils/validators"
import Input from "../../../UI/FormControls/Input/Input"
import Textarea from "../../../UI/FormControls/Textarea/Textarea"

const maxLength200 = maxLengthCreator(200)
const maxLength10000 = maxLengthCreator(10000)
const maxLength30000 = maxLengthCreator(30000)
const minLength1 = minLengthCreator(1)

let ProfileDataForm = ({ handleSubmit, profile }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <button type="submit">save</button>
      </div>
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
          [maxLength30000, required],
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

export default reduxForm({
  form: "edit-profile",
})(ProfileDataForm)
