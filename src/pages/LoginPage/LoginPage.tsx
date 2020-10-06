import React, { FC, memo } from "react"
import { reduxForm, InjectedFormProps } from "redux-form"
import {
  required,
  maxLengthCreator,
  minLengthCreator,
} from "../../utils/validators"
import { createField } from "../../components/UI/FormControls/FormControls"
import s from "../../components/UI/FormControls/FormControls.module.scss"
import s2 from "../../components/UI/FormControls/FormControls.module.scss"
import Input from "../../components/UI/FormControls/Input/Input"
import { useDispatch, useSelector } from "react-redux"
import { getCaptchaURL } from "../../redux/selectors/auth-selectors"
import { login } from "../../redux/auth-reducer"
import withProfileRedirect from "../../hoc/withProfileRedirect"

let maxLength50 = maxLengthCreator(50)
let minLength7 = minLengthCreator(7)

type LoginFormOwnProps = {
  captchaURL: string | null
}

const LoginForm: FC<
  InjectedFormProps<LoginFormDataType, LoginFormOwnProps> & LoginFormOwnProps
> = ({ captchaURL, ...props }) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        {createField<LoginFormDataKeysType>(
          "Your email",
          "email",
          [required, maxLength50, minLength7],
          Input,
          { type: "email" }
        )}
      </div>
      <div>
        {createField<LoginFormDataKeysType>(
          "Your password",
          "password",
          [required, maxLength50, minLength7],
          Input,
          { type: "password" }
        )}
      </div>
      <div>
        <label>
          {createField<LoginFormDataKeysType>(
            undefined,
            "rememberMe",
            [],
            Input,
            { type: "checkbox" },
            "remember me"
          )}
        </label>
      </div>
      {captchaURL && (
        <div className={s2.captcha}>
          <div className={s2.captchaImage}>
            <img src={captchaURL} alt="captcha" />
          </div>
          {createField<LoginFormDataKeysType>(
            "Enter captcha:",
            "captcha",
            [required],
            Input
          )}
        </div>
      )}
      {props.error && <div className={s.formSummaryError}>{props.error}</div>}
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  )
}

const LoginFormRedux = reduxForm<LoginFormDataType, LoginFormOwnProps>({
  form: "login",
})(LoginForm)

type LoginFormDataType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string
}

type LoginFormDataKeysType = Extract<keyof LoginFormDataType, string>

export const LoginPage: FC = withProfileRedirect(
  memo(() => {
    const captchaURL = useSelector(getCaptchaURL)
    const dispatch = useDispatch()

    const onSubmit = (formData: LoginFormDataType) => {
      const { email, password, rememberMe, captcha } = formData

      dispatch(login(email, password, rememberMe, captcha))
    }

    return (
      <div>
        <h1>LOGIN</h1>

        <LoginFormRedux onSubmit={onSubmit} captchaURL={captchaURL} />
      </div>
    )
  })
)
