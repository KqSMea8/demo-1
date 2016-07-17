/**
 * react-redux 提供了一个叫connect的方法啊，
 * 可以将一个组件变为container component
 */
const ContainerComponent = connect(
	/**
	 * 方法将store作为参数，返回有个（｛key:value｝）对象，
	 * key作为属性传递给DummyComponent
	 * @type{[type]}
	 */
	mapStateToProps: Function,
	/**
	 * 方法传递store.dispatch作为参数，返回一个｛key: Function｝对象，key作为属性传递给DummyComponent
	 * 
	 */
	mapDispatchToProps: Function

)(DummyConent);


