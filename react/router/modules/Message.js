import React from 'react'

// 新建一个组件让其在 Inbox 内部渲染
class Message extends React.Component{
  render() {
    return <h3>{this.props.params.userName}</h3>
  }
}

export default Message