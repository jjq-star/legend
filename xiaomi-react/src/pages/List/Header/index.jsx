import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import MiPopup from '../../../components/MiPopup';
import ListContext from '../context.js';
import style from './index.module.css';

class Header extends Component {
        static  contextType = ListContext;
        constructor(props) {
                super(props);
                this.state = { dialogShow: false };
                this.toggleShow = this.toggleShow.bind(this);
        }
        render() {
                let { title, list, orderCol, orderDir,changeName, toggleOrder } = this.props;
                let { mId, showWithListMode, toggleShowMode } = this.context;
                return(
                        <>
                                <div className={ style["top"] }>
                                        <Link to="/category" className="back iconfont icon-back"></Link>
                                        <h1 className={ style["title"] }>{ title }</h1>
                                        <a  className={ `iconfont icon-sort ${ style["sort" ]}` } onClick={ this.toggleShow }></a>
                                        <a
                                                className={ `iconfont ${ style["toggle"] } ${ showWithListMode ? "icon-category" : "icon-list" }`}
                                                onClick={ toggleShowMode }>
                                        </a>
                                </div>
                                <div className={style["sub-list"]}>
                                        <ul>
                                                { list.map(item => (
                                                        <li key={ item.id }>
                                                                <NavLink to={ `/list/${ mId }/${ item.id }` } activeClassName={ style["active" ]}>{ item.name }</NavLink>
                                                        </li>
                                                ))}
                                        </ul>
                                </div>
                                <MiPopup isShow={ this.state.dialogShow } align="top" close={ this.toggleShow }>
                                        <div className={ style["filter-dialog"] }>
                                                <div className={ style["header"] }>
                                                        <span className={ orderCol === "price" ? style["active"] : "" } onClick={ () => toggleOrder("price").then(() => this.toggleShow())}>
                                                                价格
                                                                <i className={ `iconfont ${ orderDir === 'ASC' ? "icon-sort-up" : "icon-sort-down"}`}></i>
                                                        </span>
                                                        <span  className={ orderCol === "sale" ? style["active"] : "" } onClick={ () => toggleOrder("sale").then(() => this.toggleShow()) }>
                                                                销量
                                                                <i className={ `iconfont ${ orderDir === 'ASC' ? "icon-sort-up" : "icon-sort-down"}`}></i>
                                                        </span>
                                                        <input type="text" placeholder="请输入商品名称" ref="search"  />
                                                        <i className={`iconfont icon-search ${ style["search"]}`} onClick={ () => changeName(this.refs.search.value).then(() => this.toggleShow()) }></i>
                                                </div>
                                        </div>
                                </MiPopup>
                        </>
                );
        }
        toggleShow() {
                this.refs.search.value = "";
                this.setState({ dialogShow: !this.state.dialogShow });
        }
}

export default Header;