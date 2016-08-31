import React from 'react'
import NavLink from './NavLink'

class Inbox extends React.Component{
  render() {
    return (
      <div>
        <h2>Inbox</h2>
        <ul>
          <li><NavLink to="/repos/hello/react-router">React Router</NavLink></li>
          <li><NavLink to="/repos/world/react">React</NavLink></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}

export default Inbox