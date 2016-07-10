var React = require('react');
var ReactDOM = require('react-dom');

var Hello = React.createClass({
	render: function  () {
		return <div>hello {this.props.name}</div>
	}
})

ReactDOM.render(<Hello name="world" />, document.getElementById('AppRoot'));