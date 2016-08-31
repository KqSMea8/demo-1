import React from 'react'
import NavLink from './NavLink'

class Inbox extends React.Component{
  contextTypes: {
    router: React.PropTypes.object
  }

  handleSubmit(event){
    event.preventDefault();
    const userName = event.target.elements[0].value;
    const repo = event.target.elements[1].value;
    const path = `/inbox/${userName}/${repo}`;
    this.context.push(path);
  }

  render() {
    return (
      <div>
        <h2>Inbox</h2>
        <ul>
          <li><NavLink to="/repos/hello/react-router">React Router</NavLink></li>
          <li><NavLink to="/repos/world/react">React</NavLink></li>
          <li>
             <from onSubmit={this.handleSubmit}>
                <input placeholder="userName"/>
                <input placeholder="repo"/>
                <button type="submit">go</button>
            </from>
          </li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}

export default Inbox
