import React from 'react'
import NavLink from './NavLink'
import {browserHistory, router} from 'react-router'

class Inbox extends React.Component{
   contextTypes: {
      router: React.PropTypes.object
  }

  handleSubmit(event){
    event.preventDefault();
    const userName = event.target.elements[0].value;
    const repo = event.target.elements[1].value;
    const path = `/repos/${userName}/${repo}`;
    console.log(path);
    browserHistory.push(path);
  }

  render() {
    return (
      <div>
        <h2>Inbox</h2>
        <ul>
          <li><NavLink to="/repos/hello/react-router">React Router</NavLink></li>
          <li><NavLink to="/repos/world/react">React</NavLink></li>
          <li>
             <form onSubmit={this.handleSubmit}>
                <input type="text" placeholder="userName"/>
                <input type="text" placeholder="repo"/>
                <button type="submit">Go</button>
            </form>
          </li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}

export default Inbox



