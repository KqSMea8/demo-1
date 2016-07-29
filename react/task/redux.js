function counter (state = 0, action) {
    switch(action.type) {
        case 'INCRMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}

// 创建stort来管理应用的状态
var store = createStore(counter);

store.subscribe(()=>
    console.log(store.getState())
);

// 改变内部state的唯一方法就是通过dispatch一个action
// action可以被序列化，用日记记录和存储下来，后期还可以以回放的方式执行
store.dispatch({type: 'INCRMENT'});

store.dispatch({type: 'INCRMENT'});

store.dispatch({type: 'DECREMENT'});
