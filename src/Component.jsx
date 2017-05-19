import React from 'react'

export default class Component extends React.Component {

  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <a
        href="http://google.com"
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
      >
        {this.props.children}
      </a>
    )
  }

}
