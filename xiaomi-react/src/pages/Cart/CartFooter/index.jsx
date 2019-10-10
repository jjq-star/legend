import React, {Component} from 'react';
import CartContext from '../CartContext.js';
import style from './index.module.css';

class CartFooter extends Component{
        static contextType = CartContext;
        render(){
                let { isEdit } = this.context;
                let { allSelect1, allSelect2, total1, total2, account, toggleAllSelect1, toggleAllSelect2, remove } = this.props;
                return (
                        <>
                                <div className={ `${style["footer"]} ${style["footer-edit"]} ${ isEdit ? "" : style["hide"] }` } >
                                        <span className={style["all"]} onClick={ () => toggleAllSelect2(!allSelect2)}>
                                                <i className={ `${style["checkbox"]} ${ allSelect2 ? style["checked"] : ""}` } ></i>
                                                全选
                                        </span>
                                        <button className={ `${style["btn-delete"]} ${ total2 === 0 ? style["disabled"] : ""}` } disabled={ total2 === 0} onClick={ remove }>
                                                删除
                                                <em className={style["total"] } style={{ display: total2 > 0 ? "inline" : "none"}} >({ total2 })</em>
                                        </button>
                                </div>
                                <div className={ `${style["footer"]} ${style["footer-normal"]} ${ isEdit ? style["hide"] : "" }` } >
                                        <span className={ style["all"] }  onClick={ () => toggleAllSelect1(!allSelect1)}>
                                                <i className={ `${ style["checkbox"]} ${ allSelect1 ? style["checked"] : ""}` }></i>
                                                全选
                                        </span>
                                        <span className={style["account-wrapper"]}>
                                                合计:
                                                <em className={style["account"]}>￥ { account }</em>
                                        </span>
                                        <button className={ `${style["btn-settlement"]} ${ total1 === 0 ? style["disabled"] : ""}` } disabled={ total1 === 0}>
                                                结算
                                                <em className={ style["total"] } style={{ display: total1 > 0 ? "inline" : "none"}}>({ total1 })</em>
                                        </button>
                                </div>
                        </>
                )
        }
}

export default CartFooter;