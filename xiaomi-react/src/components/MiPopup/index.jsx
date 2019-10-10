import React, { Component } from 'react';
import style from './index.module.css';

class MiPopup extends Component {
        constructor(props) {
                super(props);
                this.close = this.close.bind(this);
        }
        render() {
                let { isShow, align, close } = this.props;
                return (
                        <div className={style["mi-popup"]} style={ {display: isShow ? "block" : "none" }} onClick={ this.close}>
                                <div className={`${style["content"]} ${ align === "top" ? style["top"] : style["bottom"]}`}>
                                        {align === "bottom" && (
                                                <i className={`iconfont icon-close ${ style["close"]}`} onClick={ close }></i>
                                        )}
                                        { this.props.children }
                                 </div>
                        </div>
                );
        }
        close(e) {
                if(e.target.className.indexOf("mi-popup") !== -1) this.props.close();
        }
}

export default MiPopup;