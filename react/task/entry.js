import React from 'react'
import ReactDOM from 'react-dom'

//显示的弹窗组件
var Confirm = React.createClass({

    render: function  () {
        if (!this.props.isDisplay) {
            return null;
        }else{
            return (<div>
                  <div className="mask"></div>
                  <div className="confirm">
                    <div className="content">确定要删除吗？</div>
                    <footer className="btn">
                        <button className="btn1" onClick={this.props.handleSure}>确定</button>
                        <button className="btn2" onClick={this.props.handleCancel}>取消</button>
                    </footer>
                  </div>
            </div>)
        }
    }
})

//具体的列表项
var SpecificList = React.createClass({

    render: function  () {
        return (<li>
            {this.props.value}
            <button onClick={this.props.deleteTask(this.props.index)}>
                删除
            </button>
        </li>)
    }
})


//list列表
var List = React.createClass({
    render: function  () {

        var list = this.props.data.map(function  (value, index) {

            return <SpecificList key={index} value={value.content} index={index} deleteTask={this.props.deleteTask} />

        }.bind(this));

        return (<ul>
            {list}
        </ul>)
    }
})

//最顶层的盒子
var ListBox = React.createClass({

    getInitialState: function() {
      return {
        data: this.props.data,
        isDisplay: false,
        sure: false,
        curIndex: null
      }
    },

    deleteTask: function(index) {
        return function  () {
            this.setState({isDisplay: true, curIndex: index});
        }.bind(this);
    },

    handleSure: function() {
        this.setState({sure: true, isDisplay: false});
        var data = this.state.data;
        data.splice(this.state.curIndex, 1);
        this.setState({data: data});
    },

    handleCancel: function  () {
        this.setState({sure: false, isDisplay: false});
    },

    render: function  () {
        return (
            <div>
                <Confirm isDisplay={this.state.isDisplay}
                 handleSure={this.handleSure} handleCancel={this.handleCancel} />
                <List  data={this.state.data} deleteTask={this.deleteTask}/>
            </div>
        )
    }
})



var data = [{'id': '0', 'content': '反向代理服务器让应用更快更安全'},
            {'id': '1', 'content': '增加负载均衡服务器'},
            {'id': '2', 'content': '缓存静态及动态内容'},
            {'id': '3', 'content': '压缩数据'},
            {'id': '4', 'content': '优化 SSL/TLS'},
            {'id': '5', 'content': '使用 HTTP/2 或 SPDY'}];



ReactDOM.render(
    <ListBox data={data} />,
    document.getElementById('container')
)