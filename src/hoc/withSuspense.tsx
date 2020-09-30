import React, { ComponentType, FC, Suspense } from "react"
import Preloader from "../components/UI/Preloader/Preloader"

function withSuspense<T>(Component: ComponentType<T>) {
  const NewComponent: FC<T> = (props) => (
    <Suspense fallback={<Preloader />}>
      <Component {...props} />
    </Suspense>
  )

  return NewComponent
}

export default withSuspense
