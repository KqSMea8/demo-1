import React from 'react'
import ReactDOM from 'react-dom'


//具体的列表项
export default class SpecificList extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        return (<li>
            {this.props.value}
            <button onClick={() => this.props.deleteTask(this.props.index)}>
                删除
            </button>
        </li>)
    }
}
