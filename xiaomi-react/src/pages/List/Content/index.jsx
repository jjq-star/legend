import React, { Component } from 'react';
import ListContext from '../context';
import IScroll from 'iscroll/build/iscroll-probe';
import imagesLoaded from 'imagesloaded';
import { Link } from 'react-router-dom';
import style from './index.module.css';

class Content extends Component {
        static contextType = ListContext;
        renderInfo() {
                let { isLoading, hasMore, list } = this.props;
                if( isLoading) return (<><i className={ style["loading"] }></i><p>正在加载...</p></>);
                else if((!hasMore) && list.length > 0) return (<><i className="iconfont icon-bottom"></i><p>已到达底部...</p></>);
                else if( (!hasMore) && list.length === 0) return(<><i></i><p>暂无数据，敬请期待...</p></>);
                else return (<><i className="iconfont icon-up-double"></i><p>上拉加载...</p></>);
        }
        render() {
                let { showWithListMode } = this.context;
                let { list } = this.props;
                return (
                        <div className={ style["content"]} ref="scroll">
                                <div className={style["content-wrapper"]}>
                                        <ul className={ `clearfix ${ showWithListMode ? style["card"] : style["list"]}`}>
                                                {list.map(item =>(
                                                        <li key={ item.id }>
                                                                <Link to= {`/detail/${ item.id}`}>
                                                                        <div className={style["avatar-wrapper"]}>
                                                                                <img src= {item.avatar} alt= {item.name} className={style["avatar"]} />
                                                                        </div>
                                                                        <div className={style["item-detail"]}>
                                                                                <h3 className="ellipsis">{item.name}</h3>
                                                                                <p  className="ellipsis">{item.remark}</p>
                                                                                <span className={style["price"]}>￥ { item.price}</span>
                                                                                <span className={style["sale"]}>{item.sale} 次购买</span>
                                                                        </div>
                                                                </Link>
                                                        </li>
                                                ))}
                                        </ul>
                                        <div className={style["info"]}>
                                                { this.renderInfo() }
                                        </div>
                                </div>
                        </div>
                );
        }
        componentDidUpdate() {
                this._initOrRefreshScroll();
        }
        _initOrRefreshScroll() {                //创建 \ 更新滚动对象
                imagesLoaded(this.refs.scroll,() => { //第一个参数是托管对象，第二个参数是一个函数
                        setTimeout(() => {
                                if(this.scroll) this.scroll.refresh();
                                else {
                                        this.scroll = new IScroll(this.refs.scroll, {
                                                click: true,
                                                probeType: 3,
                                                bounce: false,               //关闭边界回弹，因为惯性滚动会触发边界回弹，影响用户体验
                                                deceleration: 0.003,         //滚动阻尼系数，
                                        });
                                        this.scroll.on('scroll', () => {
                                                if(this.props.hasMore && (!this.isLoading) && (!this.isTriggerLoadMore)) {
                                                        this.isTriggerLoadMore = this.scroll.y < 0 && this.scroll.maxScrollY  === this.scroll.y ;
                                                }
                                        });
                                        this.scroll.on('scrollEnd', () => {
                                                // if(this.scroll.y === 0) this.showRocket = false;
                                                // if(this.scroll.y < 0 && !this.showRocket) this.showRocket = true;
                                                if(this.isTriggerLoadMore) {
                                                        this.isTriggerLoadMore = false;
                                                        this.props.loadMore();
                                                }
                                        });
                                }
                        },16);
                });
        }
}

export default Content;