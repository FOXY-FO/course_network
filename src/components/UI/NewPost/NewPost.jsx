import React from "react"
import { reduxForm, Field } from "redux-form"
import { required, maxLengthCreator } from "../../../utils/validators"
import Textarea from "../FormControls/Textarea/Textarea"

let maxLength150 = maxLengthCreator(150)

let NewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        name="newPost"
        component={Textarea}
        validate={[required, maxLength150]}
      />
      <button type="submit">Add post</button>
    </form>
  )
}

NewPostForm = reduxForm({
  form: "newPost",
})(NewPostForm)

const NewPost = ({ addPost }) => {
  let onSubmit = (formData) => {
    addPost(formData.newPost)
  }

  return (
    <div>
      <NewPostForm onSubmit={onSubmit} />
    </div>
  )
}

export default NewPost
