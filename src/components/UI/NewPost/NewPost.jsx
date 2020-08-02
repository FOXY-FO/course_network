import React from "react"
import { reduxForm, Field } from "redux-form"

let NewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field name="newPost" component="textarea" />
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
