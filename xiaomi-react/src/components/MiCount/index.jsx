import React, { Component } from 'react';
import style from './index.module.css';


export default ({ count, increase, decrease }) => (
        <div className={style["mi-count"]}>
                <button className={ `iconfont icon-decrease ${ count === 1 ? style["disabled"] : ""}` } disabled={ count === 1 } onClick={ decrease }></button>
                <span className={style["count"]} >{ count }</span>
                <button className={ `iconfont icon-increase ${ count === 5 ? style["disabled"] : ""}` } disabled={ count === 5 } onClick={ increase }></button>
        </div>
);

// class MiCount extends Component{
//         render(){
//                 let { increase, decrease, count } = this.props;
//                 return (
//                         <div className={style["mi-count"]}>
//                                 <button className={ `iconfont icon-decrease ${ count === 1 ? style["disabled"] : ""}` } onClick={ decrease }></button>
//                                 <span className={style["count"]} >{ count }</span>
//                                  <button className={ `iconfont icon-increase ${ count === 5 ? style["disabled"] : ""}` } onClick={ increase }></button>
//                         </div>
//                 )
//         }
// }
//
// export default MiCount;