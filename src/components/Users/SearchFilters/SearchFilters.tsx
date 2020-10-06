import React, { FC } from "react"
import { Formik, Form, Field } from "formik"
import { FilterType } from "../../../redux/users-reducer"

type SearchFiltersProps = {
  onFilterChange: (values: SearchFiltersInitialValues) => void
}

export type SearchFiltersInitialValues = Omit<FilterType, "friend"> & {
  friend: string
}

export const SearchFilters: FC<SearchFiltersProps> = ({ onFilterChange }) => {
  const initialValues: SearchFiltersInitialValues = {
    term: "",
    friend: "false",
  }
  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => {
        const errors: Partial<FilterType> = {}
        return errors
      }}
      onSubmit={(values, { setSubmitting }) => {
        onFilterChange(values)
        setSubmitting(false)
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="text" name="term" />
          <Field as="select" name="friend">
            <option value="false">All</option>
            <option value="true">Following</option>
          </Field>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  )
}
