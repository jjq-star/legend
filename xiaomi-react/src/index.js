//  根实例（将 根组件 渲染到挂载点）
import React from 'react';                         //凡 使用JSX语法，必须导入 react
import ReactDOM from 'react-dom';       //导入 react-dom， 以便使用用 render 函数将根组件渲染挂载点
import { Provider } from 'react-redux';
import store from './store';
import { Router } from 'react-router-dom';              //导入路由
import history from './history';
import App from './App.jsx';                    //导入根组件

// vue 中使用组件要 ： 导入，注册，使用（像标签一样使用）
//react 中使用组件要： 导入， 使用（像标签一样使用）
ReactDOM.render(
        <Provider store={ store }>
                <Router history={ history }>
                        <App />
                </Router>
        </Provider>
                , document.getElementById('root')

);              //将根组件渲染到挂载点


// react 可以直接在 js 区域 书写 html 标签，不用加任何的单 、双引号，这种语法交 JSX
//react 规定;  凡使用 JSX 语法， 必须导入 react