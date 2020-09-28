export type ValidatorType = (value: string) => string | undefined

export const required: ValidatorType = (value) => {
  if (value) return undefined

  return "Field is required"
}

export let maxLengthCreator = (maxLength: number): ValidatorType => (value) => {
  if (value && value.length > maxLength)
    return `Max length is ${maxLength} symbols`

  return undefined
}

export let minLengthCreator = (minLength: number): ValidatorType => (value) => {
  if (value && value.length < minLength)
    return `Min length is ${minLength} symbols`

  return undefined
}
