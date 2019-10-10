import React, { Component } from 'react';
import MiCount from '../../../components/MiCount';
import CartContext from '../CartContext';
import { Link } from 'react-router-dom';
import style from './index.module.css';


class CartList extends Component {
        static contextType = CartContext;
        render() {
                let { list, toggleSelect1, toggleSelect2, increase, decrease } = this.props;
                let { isEdit } = this.context;
                return (
                        <ul className={style["cart-list"]}>
                                {list.map(item => (
                                        <li key={ item.id }>
                                                <i className={ `${style["checkbox"]} ${ item.select1 ? style["checked"] : ""}` } style={{ display: isEdit ? "none" : "block" }}  onClick={ () => toggleSelect1(item.id)}></i>
                                                <i className={ `${style["checkbox"]} ${ item.select2 ? style["checked"] : ""}` } style={{ display: !isEdit ? "none" : "block" }}  onClick={ () => toggleSelect2(item.id)}></i>
                                                <Link to={ `/detail/${ item.id }` } className={style["avatar-wrapper"]}>
                                                        <img src={ item.avatar } />
                                                </Link>
                                                <div className={style["cart-info"] }>
                                                        <Link to={ `/detail/${ item.pid }` } className={style["name-wrapper"]}>
                                                                <h3  className={style["ellipsis"]}>{ item.name }</h3>
                                                        </Link>
                                                        <div className={style["cart-info-footer"]}>
                                                                <span className={style["price"]} >￥{ item.price }</span>
                                                                <div className={style["count-wrapper"]}>
                                                                        <MiCount
                                                                                count={ item.count }
                                                                                decrease={() => decrease(item.id)}
                                                                                increase={ () => increase(item.id)}
                                                                        />
                                                                </div>
                                                        </div>
                                                </div>
                                        </li>
                                ))}
                        </ul>
                );
        }
}

export default CartList;