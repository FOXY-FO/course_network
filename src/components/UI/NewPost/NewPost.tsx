import React, { FC } from "react"
import { reduxForm, Field, InjectedFormProps } from "redux-form"
import { required, maxLengthCreator } from "../../../utils/validators"
import { createField } from "../FormControls/FormControls"
import Textarea from "../FormControls/Textarea/Textarea"

const maxLength150 = maxLengthCreator(150)

const NewPostForm: FC<InjectedFormProps<FormValues>> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      {createField<FormValuesKeys>(
        undefined,
        "newPost",
        [required, maxLength150],
        Textarea
      )}
      <Field
        name="newPost"
        component={Textarea}
        validate={[required, maxLength150]}
      />
      <button type="submit">Add post</button>
    </form>
  )
}

const NewPostFormRedux = reduxForm<FormValues>({
  form: "newPost",
})(NewPostForm)

type FormValues = {
  newPost: string
}

type FormValuesKeys = Extract<keyof FormValues, string>

type NewPostProps = {
  addPost: (message: string) => void
}

const NewPost: FC<NewPostProps> = ({ addPost }) => {
  const onSubmit = (formData: FormValues) => {
    addPost(formData.newPost)
  }

  return (
    <div>
      <NewPostFormRedux onSubmit={onSubmit} />
    </div>
  )
}

export default NewPost
