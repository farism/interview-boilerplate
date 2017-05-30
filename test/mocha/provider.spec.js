import { describe, it } from 'mocha'
import jsdom from 'mocha-jsdom'
import { expect } from 'chai'
import React from 'react'
import { shallow, mount, render } from 'enzyme'

import connect from '../../src/connect'
const initialState = {
  foo: 'bar',
}
const getStore = (initialState) => {
  let state = initialState
  return {
    getState: () => state,
  }
}

class ChildComponent extends React.Component {

  getContext() {
    return {
      store: this.context.store,
    }
  }

  render() {
    const {foo} = this.context.store.getState()
    return <div>{foo}</div>
  }

}

ChildComponent.contextTypes = {
  store: React.PropTypes.shape
}



class Provider extends React.Component {

  constructor(props) {
    super(props)

    if (!this.props.children || typeof this.props.children === 'array') {
      throw new TypeError('Invalid child component')
    }

    this.state = {
      store: props.store,
    };
  }

  getChildContext() {
    return {
      store: this.state.store,
    }
  }

  render() {
    return React.Children.only(this.props.children)
  }

}

Provider.childContextTypes = {
  store: React.PropTypes.shape
}

describe('provider', () => {
  jsdom()

  const store = getStore(initialState);

  it('is a React component that accepts `store` as a prop', () => {
    const wrapper = mount(<Provider store={store}>
      <div/>
    </Provider>);

    expect(wrapper.props().store).to.eql(store);
  })

  it('provides redux store as context', () => {
    const wrapper = mount(<Provider store={store}>
      <ChildComponent/>
    </Provider>);
    expect(
      wrapper
        .find(ChildComponent)
        .html()
    ).to.eql(`<div>${store.getState().foo}</div>`)
  })

  it('accepts a single child element', () => {
    const dom = (
      <Provider store={store}>
        <div/>
      </Provider>
    )

    expect(mount.bind(null, dom)).to.not.throw(TypeError)

    const emptyDom = (
      <Provider store={store}>
      </Provider>
    )

    expect(mount.bind(null, emptyDom)).to.throw(TypeError, 'Invalid child component')

    const arrayDom = (
      <Provider store={store}>
        <div />
        <div />
      </Provider>
    )

    expect(mount.bind(null, arrayDom)).to.throw('React.Children.only expected to receive a single React element child.')
  })

})
