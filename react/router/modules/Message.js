import React from 'react'

// 新建一个组件让其在 Inbox 内部渲染
class Message extends React.Component{

    render() {
       const {userName, repoName} = this.props.params;

       return <h3>{userName} / {repoName}</h3>
    }
}

export default Message

