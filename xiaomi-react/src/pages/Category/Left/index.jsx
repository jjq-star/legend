import React, { Component } from 'react';
import style from './index.module.css';

class Left extends Component {
        render() {
                let { list, activeId, toggleId } = this.props;
                return (
                        <>
                        {list.length > 0 && (
                                <ul className={ style["main-list"] }>
                                        {list.map(item => (
                                                <li
                                                        key={ item.id }
                                                        className={ item.id === activeId ? style["active"] : ''}
                                                        onClick={ () => toggleId(item.id) }>
                                                        <span>{ item.name }</span>
                                                </li>
                                        ))}
                                </ul>
                        )}
                        </>
                )
        }
}

export default Left;