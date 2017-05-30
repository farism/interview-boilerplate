export const createStore = (reducer, initialState) => {
  if (typeof reducer === 'undefined') {
    throw new TypeError('First argument should be an object with reducers')
  }

  if (typeof initialState === 'undefined') {
    throw new TypeError('Second argument should be initialState')
  }

  let state = initialState
  let subscriptions = []

  return {
    getState: () => {
      return state
    },
    dispatch: (action) => {
      const fn = reducer[action.type]
      if (fn) {
        state = fn(state, action)
      }
    },
    getSubscriptions: () => {
      return subscriptions
    },
    subscribe: (listener) => {
      subscriptions.push(listener)
    },
    unsubscribe: (listener) => {
      subscriptions = subscriptions.filter(fn => fn !== listener)
    },
  }
}
