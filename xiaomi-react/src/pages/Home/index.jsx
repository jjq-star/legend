import React, { Component } from 'react';
import MiNav from '../../components/MiNav';                     //      导入菜单组件
import style from './index.module.css';

class Home extends Component{
        constructor(props) {
                super(props);
                console.log('constructor 被调用了');
        }
        componentWillMount() {
                console.log('componentWillMount 被调用了');
        }
        render(){
                console.log('render 被调用了');
                return (
                        <div className={ style["page-wrapper"] }>
                                这是主页
                                <MiNav />
                        </div>
                );
        }
        componentDidMount() {
                console.log('componentDidMount 被调用了');
        }
        //更新
        componentWillReceiveProps() {
                console.log('只有父亲传给儿子的数据发生变化时才会被调用');
        }
        shouldComponentUpdate() {
                console.log('当 返回 true 时表示放行，不阻止组件的更新; 返回 false 时表示阻止组件的更新');
                return true;
        }
        componentWillUpdate() {
                console.log('组件更新前调用');
        }
        componentDidUpdate() {
                console.log('组件更新后调用');
        }
        componentWillUnmount() {
                console.log('组件销毁时调用');
        }
}

export default Home;