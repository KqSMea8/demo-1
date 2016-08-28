import React from 'react'
import ReactDOM from 'react-dom'
import SpecificList from '../components/SpecificList'

//list列表
export default class List extends React.Component{

    constructor(props){
        super(props);
    }

    render() {

        var list = this.props.data.map(function  (value, index) {

            return <SpecificList key={index} value={value.content} index={index} deleteTask={this.props.deleteTask} />

        }.bind(this));

        return (<ul>
            {list}
        </ul>)
    }
}
