import React from 'react'
import { describe, it } from 'mocha'
import { assert, expect } from 'chai'
import jsdom from 'mocha-jsdom'
import { shallow, mount, render } from 'enzyme'

const defaultMapDispatchToProps = () => ({})
const defaultMapStateToProps = () => ({})

const initialState = {
  foo: 'bar',
}

const getStore = (initialState) => {
  let state = initialState
  return {
    getState: () => state,
  }
}

const defaultMergeProps = (
  stateProps,
  dispatchProps,
  ownProps,
) => {
  return {
    // ...ownProps,
    // ...stateProps,
    // ...dispatchProps,
  }
}

const connect = (
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
) => {
  if (typeof mapStateToProps !== 'function') {
    throw new TypeError('First argument should be an function')
  }

  if (typeof mapStateToProps() !== 'object') {
    throw new TypeError('mapStateToProps must return an object')
  }

  if (typeof mapDispatchToProps !== 'function') {
    throw new TypeError('Second argument should be an function')
  }

  if (typeof mapDispatchToProps() !== 'object') {
    throw new TypeError('mapDispatchToProps must return an object')
  }
  return Component => {
    class Connect extends React.Component {

      getContext() {
        return {
          store: this.context.store
        }
      }
      render() {
        const {store} = this.context
        const state = {}
        const stateProps = mapStateToProps(store.getState())
        const dispatchProps = mapDispatchToProps(store.dispatch)
        return (<div/>)
      }
    }

    Connect.contextTypes = {
      store: React.PropTypes.object
    }

    return Connect
  }
}

describe('connect', () => {
  jsdom()

  const store = getStore(initialState);

  it('throws if mapStateToProps does not return an object', () => {
    expect(connect.bind(null, () => {})).to.throw(TypeError, 'mapStateToProps must return an object')
  })

  it('throws if mapDispatchToProps does not return an object', () => {
    expect(
      connect.bind(null,
        () => ({}),
        () => {}
      )
  ).to.throw(TypeError, 'mapDispatchToProps must return an object')
  })

  it('connect passes state to mapStateToProps', () => {
    const Component = (props) => <div>{props.foo}</div>

    const Connected = connect(
      defaultMapStateToProps,
      defaultMapDispatchToProps
    )(Component)

    const wrapper = mount(<Connected/> , {context: {store}} )
    console.log(wrapper.find(Component))
  })

})
