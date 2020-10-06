import React, { FC } from "react"
import { Formik, Form, Field } from "formik"
import UsersContainer from "./User/UserContainer"
import Pagination from "../UI/Pagination/Pagination"
import { UserType } from "../../types/types"
import { FilterType } from "../../redux/users-reducer"

type Props = {
  users: UserType[]
  totalUsersCount: number
  followingInProgress: number[]
  pageSize: number
  currentPage: number
  onPageChange: (page: number) => void
  onFilterChange: (values: SearchFiltersInitialValues) => void
}

const Users: FC<Props> = ({
  users,
  totalUsersCount,
  pageSize,
  currentPage,
  followingInProgress,
  onPageChange,
  onFilterChange,
}) => {
  return (
    <>
      <div style={{ marginBottom: "2rem" }}>
        <SearchFilters onFilterChange={onFilterChange} />
      </div>
      <Pagination
        total={totalUsersCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
      {users.map((u) => (
        <UsersContainer
          key={u.id}
          followingInProgress={followingInProgress}
          {...u}
        />
      ))}
    </>
  )
}

type SearchFiltersProps = {
  onFilterChange: (values: SearchFiltersInitialValues) => void
}

export type SearchFiltersInitialValues = Omit<FilterType, "friend"> & {
  friend: string
}

const SearchFilters: FC<SearchFiltersProps> = ({ onFilterChange }) => {
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

export default Users
