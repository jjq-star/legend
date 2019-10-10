import React, { Component } from 'react';
import CartContext from '../CartContext';
import CartHeader from '../CartHeader';
import CartFooterContainer from '../CartFooterContainer';
import CartWithoutLogin from '../CartWithoutLogin';
import CartEmpty from '../CartEmpty';
import CartListContainer from '../CartListContainer';
import style from './index.module.css';

class Wrapper extends Component{
        constructor(props) {
                super(props);
                this.state = {
                        isEdit: false
                };
                this.toggleEdit = this.toggleEdit.bind(this);
        }
        toggleEdit() { this.setState({ isEdit: !this.state.isEdit }) }
        renderHeader() {
                return sessionStorage.getItem("token") && !this.props.isEmpty ? (<button className={ style["btn-edit"]} onClick={ this.toggleEdit }>{ this.state.isEdit ? "完 成" : "编 辑" }</button>) : null;
        }
        renderFooter() {
                return sessionStorage.getItem("token") && (!this.props.isEmpty) ? (<CartFooterContainer />) : null;
        }
        renderContent() {
                if(!sessionStorage.getItem("token")) return (<CartWithoutLogin />);
                else if(this.props.isEmpty) return (<CartEmpty />);
                else return (<CartListContainer />);
        }
        render(){
                return (
                        <div className={ style["page-wrapper"] }>
                                <CartContext.Provider value={ this.state }>
                                        <div className={ style["header-wrapper"] }>
                                                <CartHeader>
                                                        { this.renderHeader() }
                                                </CartHeader>
                                        </div>
                                        <div className={ style["content-wrapper"] }>
                                                { this.renderContent() }
                                        </div>
                                        <div className={ style["footer-wrapper"] }>
                                                { this.renderFooter() }
                                        </div>
                                </CartContext.Provider>

                        </div>
                )
        }
}

export default Wrapper;