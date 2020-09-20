import React from "react"
import { create } from "react-test-renderer"
import ProfileStatus from "./ProfileStatus"

const component = create(
  <ProfileStatus status={"I love Marina :3"} getUserStatus={() => {}} />
)
const instance = component.getInstance()
const root = component.root

describe("Profile Status Component", () => {
  test("status from props should be set in the local state", () => {
    expect(instance.state.status).toBe("I love Marina :3")
  })
  test("after creation <span> should be displayed", () => {
    let span = root.findByType("span")
    expect(span).not().toBeNull()
  })

  test("after creation <span> should contain the correct text", () => {
    let span = root.findByType("span")
    expect(span.innerText).toBe("I love Marina :3")
  })
})
