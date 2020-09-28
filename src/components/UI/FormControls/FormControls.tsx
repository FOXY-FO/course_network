import React, { ComponentType } from "react"
import { Field, WrappedFieldProps } from "redux-form"
import { ValidatorType } from "../../../utils/validators"

export function createField<NameKeysType extends string>(
  placeholder: string | undefined,
  name: NameKeysType,
  validators: ValidatorType[],
  component: ComponentType<WrappedFieldProps> | "input" | "select" | "textarea",
  props = {},
  text = ""
) {
  return (
    <div>
      <Field
        placeholder={placeholder}
        name={name}
        validate={validators}
        component={component}
        {...props}
      />{" "}
      {text}
    </div>
  )
}
