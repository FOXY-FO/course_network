import React, { FC } from "react"
import { useDispatch } from "react-redux"
import { reduxForm, InjectedFormProps } from "redux-form"
import { actions } from "../../../redux/profile-reducer"
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

export const NewPost: FC = () => {
  const dispatch = useDispatch()

  const onSubmit = (formData: FormValues) => {
    dispatch(actions.addPost(formData.newPost))
  }

  return (
    <div>
      <NewPostFormRedux onSubmit={onSubmit} />
    </div>
  )
}
