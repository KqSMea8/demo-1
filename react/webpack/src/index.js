import React from "react"
import {render} from "react-dom"
import {Provider} from "react-redux"	
import {createStore} from "redux"
import todoApp from "./reducers"
import App from "./components/App"


/**
 * store数据例子
{
	visibilityFilter: "SHOW_ALL",
	todos: [
		{
			text: "Consider using Redux",
			complete: true,
		},
		{
			text: "Keep all state in a single tree",
			complete: false,
		}
	]
}

*/

let store = createStore(todoApp);

render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById("root")
)