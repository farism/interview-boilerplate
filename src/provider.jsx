import React from 'react'

class Provider extends React.Component {

  constructor(props) {
    super(props)

    if (!this.props.children) {
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

export default Provider
