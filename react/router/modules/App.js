import React from 'react'
import { Router, Route, Link, IndexRoute } from 'react-router';
import NavLink from './NavLink'

// 然后我们从应用中删除一堆代码和
// 增加一些 <Link> 元素...
class App extends React.Component {
  render() {
    return (
      <div>
        <h1>App</h1>
        {/* 把 <a> 变成 <Link> */}
        <ul>
          <li><NavLink to="/" onlyActiveOnIndex>Home</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/inbox">Inbox</NavLink></li>
        </ul>
        {/*
          接着用 `this.props.children` 替换 `<Child>`
          router 会帮我们找到这个 children
        */}
        {this.props.children}
      </div>
    )
  }
}

export default App