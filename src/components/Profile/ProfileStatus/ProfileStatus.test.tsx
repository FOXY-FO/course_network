import React from "react"
import { create } from "react-test-renderer"
import ProfileStatus from "./ProfileStatus"

describe("ProfileStatus Component", () => {
  test("status from props should be in the state", () => {
    const component = create(
      <ProfileStatus
        status="it-kamasutra"
        currentUserId={2}
        getUserStatus={(id: number) => {}}
        updateUserStatus={(status: string) => {}}
      />
    )
    // @ts-ignore
    const instance = component.getInstance()
    // @ts-ignore
    expect(instance?.state.status).toBe("it-kamasutra")
  })

  test("after creation span should be displayed with correct status", () => {
    const component = create(<ProfileStatus status="it-kamasutra" />)
    const root = component.root
    let span = root.findByType("span")
    expect(span).not.toBeNull()
  })

  test("after creation input shouldn't be displayed", () => {
    const component = create(<ProfileStatus status="it-kamasutra" />)
    const root = component.root
    expect(() => {
      let input = root.findByType("input")
    }).toThrow()
  })

  test("after creation span should contain correct status", () => {
    const component = create(<ProfileStatus status="it-kamasutra" />)
    const root = component.root
    const span = root.findByType("span")
    expect(span.children[0]).toBe("it-kamasutra")
  })

  test("input should be displayed in edit mode instead of span", () => {
    const component = create(<ProfileStatus status="it-kamasutra" />)
    const root = component.root
    const span = root.findByType("span")
    span.props.onDoubleClick()
    const input = root.findByType("input")
    expect(input.props.value).toBe("it-kamasutra")
  })

  test("callback should be called", () => {
    const mockCallback = jest.fn()
    const component = create(
      <ProfileStatus status="it-kamasutra" updateUserStatus={mockCallback} />
    )
    const instance = component.getInstance()
    instance.deactivateEditMode()
    expect(mockCallback.mock.calls.length).toBe(1)
  })
})
