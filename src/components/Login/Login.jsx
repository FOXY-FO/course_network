import React from "react"
import { Field, reduxForm } from "redux-form"

let LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          type="email"
          name="email"
          placeholder="Your email"
          component="input"
        />
      </div>
      <div>
        <Field
          type="password"
          name="password"
          placeholder="Your password"
          component="input"
        />
      </div>
      <div>
        <label>
          <Field type="checkbox" name="rememberMe" component="input" /> remember
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
