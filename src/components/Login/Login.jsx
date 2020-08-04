import React from "react"
import { Field, reduxForm } from "redux-form"
import {
  required,
  maxLengthCreator,
  minLengthCreator,
} from "../../utils/validators"
import Input from "../UI/FormControls/Input/Input"

let maxLength50 = maxLengthCreator(50)
let minLength7 = minLengthCreator(7)

let LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          type="email"
          name="email"
          placeholder="Your email"
          validate={[required, maxLength50, minLength7]}
          component={Input}
        />
      </div>
      <div>
        <Field
          type="password"
          name="password"
          placeholder="Your password"
          validate={[required, maxLength50, minLength7]}
          component={Input}
        />
      </div>
      <div>
        <label>
          <Field type="checkbox" name="rememberMe" component={Input} /> remember
          me
        </label>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  )
}

LoginForm = reduxForm({
  form: "login",
})(LoginForm)

let Login = ({ login }) => {
  let onSubmit = (formData) => {
    let { email, password, rememberMe } = formData

    login(email, password, rememberMe)
  }

  return (
    <div>
      <h1>LOGIN</h1>

      <LoginForm onSubmit={onSubmit} />
    </div>
  )
}

export default Login
