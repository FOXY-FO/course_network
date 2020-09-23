import React from "react"
import { Field, reduxForm } from "redux-form"
import {
  required,
  maxLengthCreator,
  minLengthCreator,
} from "../../utils/validators"
import s from "../UI/FormControls/FormControls.module.scss"
import Input from "../UI/FormControls/Input/Input"

let maxLength50 = maxLengthCreator(50)
let minLength7 = minLengthCreator(7)

let LoginForm = ({ captchaURL, ...props }) => {
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
      {captchaURL && (
        <div className={s.captcha}>
          <div className={s.captchaImage}>
            <img src={captchaURL} alt="captcha" />
          </div>
          <Field
            name="captcha"
            component={Input}
            validate={[required]}
            placeholder="Enter captcha:"
          />
        </div>
      )}
      {props.error && <div className={s.formSummaryError}>{props.error}</div>}
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  )
}

LoginForm = reduxForm({
  form: "login",
})(LoginForm)

let Login = ({ login, captchaURL }) => {
  let onSubmit = (formData) => {
    let { email, password, rememberMe, captcha } = formData

    login(email, password, rememberMe, captcha)
  }

  return (
    <div>
      <h1>LOGIN</h1>

      <LoginForm onSubmit={onSubmit} captchaURL={captchaURL} />
    </div>
  )
}

export default Login
