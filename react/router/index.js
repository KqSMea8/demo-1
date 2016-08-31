import React from 'react'
import { render } from 'react-dom'

// 首先我们需要导入一些组件...
import { Router, Route, hashHistory, IndexRoute, IndexLink, browserHistory} from 'react-router'


import App from './modules/App'
import About from './modules/About'
import Inbox from './modules/Inbox'
import Message from './modules/Message'
import Home from './modules/Home'


// 最后，我们用一些 <Route> 来渲染 <Router>。
// 这些就是路由提供的我们想要的东西。
render((
  <Router history={browserHistory} >
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/about" component={About} />
      <Route path="/inbox" component={Inbox} >
        <Route path="/repos/:userName/:repoName" component={Message}/>
      </Route>
    </Route>
  </Router>
), document.getElementById('app'))

