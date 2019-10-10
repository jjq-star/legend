import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';             //导入 NavLink
import style from './index.module.css';

class MiNav extends Component {
        render() {
                return (
                        <ul className={ style["nav"]}>
                                <li>
                                        <NavLink to="/" activeClassName={ style["active"] } exact>
                                                <i></i>
                                                <span>首页</span>
                                        </NavLink>
                                </li>
                                <li>
                                        <NavLink to="/category" activeClassName={ style["active"] }>
                                                <i></i>
                                                <span>分类</span>
                                        </NavLink>
                                </li>
                                <li>
                                        <NavLink to="/taste" activeClassName={ style["active"] }>
                                                <i></i>
                                                <span>品味</span>
                                        </NavLink>
                                </li>
                                <li>
                                        <NavLink to="/cart" activeClassName={ style["active"] }>
                                                <i></i>
                                                <span>购物车</span>
                                        </NavLink>
                                </li>
                                <li>
                                        <NavLink to="/profile" activeClassName={ style["active"] }>
                                                <i></i>
                                                <span>个人中心</span>
                                        </NavLink>
                                </li>
                        </ul>
                );
        }
}

export default MiNav;