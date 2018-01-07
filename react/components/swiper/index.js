/**
 * @file 横滑组件
 * @author: sufubo
 */
import React from 'react';
import { Link } from 'react-router-dom';
import './index.less';
// import { Carousel } from 'antd';

export default class Payicon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            x: 0
        };

    }

    handlerTouchStart(e) {
        console.log(e.nativeEvent);

        console.log(e.touches[0].pageX);
        this.setState({
            x: e.touches[0].pageX
        });
    }

    handlerTouchMove(e) {
        let clientX = e.pageX;
        let gap = this.state.x - e.touches[0].pageX;

        if (gap > 50) {
            console.log('向左移动了', '开始刷新');
            this.swipeMove(gap);
        }
    }

    swipeMove(x) {
        let slipDom = this.refs.slip;
        x = x > 50 ? 50 : x;
        slipDom.style.transform = `translateX(${-x}px)`;
    }

    handlerTouchEnd() {
        let slipDom = this.refs.slip;
        slipDom.style.transform = 'translateX(0)';
    }

    componentDidMount() {
        this.handlerTouchEnd();
    }

    render() {
        return <div>
            <div className='slip-wrap'
            >
                <div className='slip-container'
                ref='slip' onTouchStart={this.handlerTouchStart.bind(this)}
                onTouchMove={this.handlerTouchMove.bind(this)}
                onTouchEnd={this.handlerTouchEnd.bind(this)}>
                    <div className='left' >
                    </div>
                    <div className='right'></div>
                </div>
            </div>
        </div>
    }

}
