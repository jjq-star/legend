//根组件
// react 组件创建有两种语法方式 （函数组件 、 类组件）
import React, { Component } from 'react';
//导入用于缓存的liveRoute
import NotLiveRoute from 'react-live-route';
//导入路由管理的包
import { Switch, Route, withRouter } from 'react-router-dom';
//导入自己的 css
import './App.css';
//导入所有的页面级组件
import Pages from './pages';

const LiveRoute = withRouter(NotLiveRoute);

//react 规定 组件名必须采用 Pascal 命名法（ 首字母必须大写）
//类组件 的方式定义 react 组建内部必须包含一个 render 函数， 且 render函数必须返回一个 JSX 对象
// 最好在 JSX 对象的 最外面显示的包裹一层小括号
class App extends Component {
        render() {
                return (
                        <>
                                <Switch>
                                        <Route path='/' component={ Pages.Home } exact />
                                        {/* 单纯的占位， 就是为了如果路由是 /category，  不要被判定为 404*/}
                                        <Route path='/category' />
                                        <Route path='/list/:mId/:sId' />
                                        <Route path='/detail/:id' component={ Pages.Detail } />
                                        <Route path='/address' component={ Pages.Address } />
                                        <Route path='/cart' component={ Pages.Cart } />
                                        <Route path='/login' component={ Pages.Login } />
                                        <Route path='/order' component={ Pages.Order } />
                                        <Route path='/profile' component={ Pages.Profile } />
                                        <Route path='/Register' component={ Pages.Register } />
                                        <Route path='*' component={ Pages.NotFound } />
                                </Switch>
                                <LiveRoute path='/category' alwaysLive={ true } component={ Pages.Category }></LiveRoute>
                                <LiveRoute path='/list/:mId/:sId' alwaysLive={ true } component={ Pages.List }></LiveRoute>
                        </>
                );
        }
}

export default App;