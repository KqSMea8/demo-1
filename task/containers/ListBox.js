import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import List from './List'
import Confirm from '../components/Confirm'
import store from '../store/configureStore'
import {display, confirmDeleteTask, cancel} from '../actions/task'



//最顶层的盒子
class ListBox extends React.Component{


    constructor(props){
        super(props);
    }

    render(){
      //通过调用connect()注入
      const {dispatch, state} = this.props
        return (
            <div>
                <List data={state.data}
                      deleteTask={(index) => dispatch(display(index))}/>

                 <Confirm isDisplay={state.isDisplay}
                  handleSure={(data, index) => dispatch(confirmDeleteTask(data, index))}
                  handleCancel={() => dispatch(cancel())}
                  data={state.data} index={state.curIndex} />
            </div>
        )
    }

}

function select(state){
  return {
    state: state
  }
}
export default connect(select)(ListBox)