import React, { Suspense } from "react"
import Preloader from "../components/UI/Preloader/Preloader"

const withSuspense = (Component) => (props) => {
  return (
    <Suspense fallback={<Preloader />}>
      <Component {...props} />
    </Suspense>
  )
}

export default withSuspense
