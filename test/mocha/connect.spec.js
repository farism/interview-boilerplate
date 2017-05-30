import React from 'react'
import { describe, it } from 'mocha'
import { assert, expect } from 'chai'
import jsdom from 'mocha-jsdom'
import { shallow, mount, render } from 'enzyme'

const initialState = {
  foo: 'bar',
}

const getStore = (initialState) => {
  let state = initialState
  return {
    getState: () => state,
  }
}

describe('connect', () => {
  jsdom()

  const store = getStore(initialState);

  it.skip('throws if mapStateToProps does not return an object', () => {
    expect(connect.bind(null, () => {})).to.throw(TypeError, 'mapStateToProps must return an object')
  })

  it.skip('throws if mapDispatchToProps does not return an object', () => {
    expect(
      connect.bind(null,
        () => ({}),
        () => {}
      )
  ).to.throw(TypeError, 'mapDispatchToProps must return an object')
  })

  it.skip('connect passes state to mapStateToProps', () => {
    const Component = (props) => <div>{props.foo}</div>

    const Connected = connect(
      defaultMapStateToProps,
      defaultMapDispatchToProps
    )(Component)

    const wrapper = mount(<Connected/> , {context: {store}} )
  })

})
