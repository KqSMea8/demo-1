import { data } from '../actions/task'
import {combinReducers} from 'redux'


var initState = {
    data: data,
    isDisplay: false,
    sure: false,
    curIndex: null
}


//reducer
export default function  deleteTask (state = initState, action) {
    switch(action.type){
        case 'ISDISPLAY':
            return Object.assign({}, state, {
                isDisplay: true,
                curIndex: action.index
            })
        case 'CONFIRM':
            return Object.assign({}, state, {
                data: action.data,
                isDisplay: false,
                sure: true
            })
        case 'CANCEL':
            return Object.assign({}, state, {
                isDisplay: false,
                sure: false
            })
        default:
            return state
    }
}

