import React from 'react'
import { render } from 'react-dom'
import ListBox from './containers/ListBox'
import store from './store/configureStore'
import { Provider } from 'react-redux'

let rootElement = document.getElementById('container');

render(
    <Provider store={store}>
        <ListBox/>
    </Provider>,
    rootElement
)



