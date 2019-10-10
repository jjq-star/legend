import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import style from './index.module.css';

class Right extends Component {
        render() {
                let { list, activeId, avatar } = this.props;
                return (
                        <div className={ style["right-wrapper"]}>
                                { avatar !== '' && (
                                        <img src={ avatar } className={ style["avatar"] } />
                                )}
                                { list.length > 0 ? (
                                        <ul>
                                                { list.map(item => (
                                                        <li key={ item.id }>
                                                                <Link to={ `/list/${ activeId }/${ item.id }` }>
                                                                        <img src={ item.avatar} />
                                                                        <span>{ item.name }</span>
                                                                </Link>
                                                        </li>
                                                ))}
                                        </ul>
                                ) : (
                                        <p>暂时数据，敬请期待</p>
                                )}
                        </div>
                )
        }
}

export default Right;