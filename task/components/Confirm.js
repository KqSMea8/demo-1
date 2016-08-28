import React from 'react'
import ReactDOM from 'react-dom'

//显示的弹窗组件
export default class Confirm extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.isDisplay) {
            return null;
        }else{
            return (<div>
                  <div className="mask"></div>
                  <div className="confirm">
                    <div className="content">确定要删除吗？</div>
                    <footer className="btn">
                        <button className="btn1" onClick={() => this.props.handleSure(this.props.data, this.props.index)}>确定</button>
                        <button className="btn2" onClick={this.props.handleCancel}>取消</button>
                    </footer>
                  </div>
            </div>)
        }
    }
}
