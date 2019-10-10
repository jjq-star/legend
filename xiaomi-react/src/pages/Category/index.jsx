import React, { Component } from 'react';
import Wrapper from './Wrapper'

//如果一个组件正常运作需要一些数据的支撑，这些数据不对外，只对内，我们把这些数据保存在 state 中
//而且组件的 state 只能在 constructor 构造函数中进行初始化
//如果一个组件有 state 我们往往叫做“有状态组件”，没有 state 叫做“无状态组件”
class Category extends Component {
        constructor(props) {
                super(props);
                this.state = {                          //只有 constructor 这里有权利使用等号赋值对 state进行初始化，其他地方都不行
                        activeId: 0,                        //当前激活的一级分类的 id
                };
                this.toggleId = this.toggleId.bind(this);               //让 toggleId 方法中的 this 永远指的是 Category 组件本身， 无论在什么情况下调用
        }
        render(){
                return (
                        <Wrapper activeId={ this.state.activeId } toggleId={ this.toggleId } />
                );
        }
        toggleId(id) { if(id !== this.state.activeId) this.setState({ activeId: id }); }
        //我是 被加强版 LiveRoute 渲染的组件，我一旦被创建，永不销毁，且我的 props 中会多出三个路由相关
        //的属性： history、location、match;但这同时也带了一个大坑，只要路由发生变化，不管是不是 category 、不管与我是否相关，我的 props 中的
        // location 都会发生变化，这就导致了我会无脑的刷新调用 render 函数， 这是非常不好的。幸好我有下面的
        //生命周期钩子函数可以判定路由变化是不是和我相关，和我相关我就 return true，  不相关就 return false
        // 这就减少了不必要的 render 更新。
        //location 用于读取路径
        shouldComponentUpdate(nextProps,nextState) {
                return nextProps.location.pathname === '/category' && this.props.location.pathname === '/category';
        }
}

export default Category;