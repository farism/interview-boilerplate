import { describe, it } from 'mocha'
import { assert, expect } from 'chai'

import { createStore } from '../../src/store'

const RESET = 'RESET'
const INCREMENT = 'INCREMENT'
const DECREMENT = 'DECREMENT'

const reducer = {
  [RESET]: (state, action) => {
    return action.payload
  },
  [INCREMENT]: (state, action) => {
    return state + 1
  },
  [DECREMENT]: (state, action) => {
    return state - 1
  },
}

const initialState = 0
let store = createStore(reducer, initialState)

describe('createStore', () => {

  afterEach(() => {
    store = createStore(reducer, initialState)
  })

  it('returns an object', () => {
    assert.isObject(store, 'store is an object')
  })

  it('throws if not passed a reducer as the first argument', () => {
    expect(createStore).to.throw(TypeError, 'First argument should be an object with reducers')
  })

  it('throws if not passed an initialState as the second argument', () => {
    expect(createStore.bind(null, reducer)).to.throw(TypeError, 'Second argument should be initialState')
  })

  describe('store object', () => {

    it('initial state is equal to the state passed in as arg', () => {
      expect(store.getState()).to.equal(initialState)
    })

    it('#getState() property is a function', () => {
      assert.isFunction(store.getState, 'getState is a function')
    })

    it('#getState() returns the current state of the store', () => {
      expect(store.getState()).to.equal(initialState)
    })

    it('#dispatch() property is a function', () => {
      assert.isFunction(store.dispatch, 'dispatch is a function')
    })

    it('#dispatch() of an increment action increases the value of the counter state', () => {
      store.dispatch({ type: INCREMENT })
      expect(store.getState()).to.equal(1)
    })

    it('#dispatch() of a decrement action decreases the value of the counter state', () => {
      store.dispatch({ type: DECREMENT })
      expect(store.getState()).to.equal(-1)
    })

    it('#dispatch() of a reset action sets state to the declared value', () => {
      store.dispatch({ type: INCREMENT })
      store.dispatch({ type: INCREMENT })
      store.dispatch({ type: DECREMENT })
      store.dispatch({ type: RESET, payload: initialState })
      expect(store.getState()).to.equal(0)
    })

    it('#getSubscriptions() is a function', () => {
      assert.isFunction(store.getSubscriptions, 'getSubscriptions is a function')
    })

    it('#getSubscriptions() returns the current subscriptions', () => {
      expect(store.getSubscriptions()).to.eql([])
    })

    it('#subscribe() property is a function', () => {
      assert.isFunction(store.subscribe, 'subscribe is a function')
    })

    it('#subscribe() adds a subscriber to the stores subscription list', () => {
      const listener = (state) => {}
      store.subscribe(listener)
      expect(store.getSubscriptions()).to.eql([listener])
    })

    it('#unsubscribe() property is a function', () => {
      assert.isFunction(store.unsubscribe, 'unsubscribe is a function')
    })

    it('#unsubscribe() removes a subscriber from the stores subscription list', () => {
      const listener = (state) => {}
      store.subscribe(listener)
      const listener2 = (state) => {}
      store.subscribe(listener2)
      const listener3 = (state) => {}
      store.subscribe(listener3)
      store.unsubscribe(listener)
      expect(store.getSubscriptions()).to.eql([listener2, listener3])
    })

  })

})
