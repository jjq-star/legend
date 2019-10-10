import React, {Component} from 'react';
import style from './index.module.css';
import { Link, withRouter } from 'react-router-dom';
import IScroll from 'iscroll';
import imagesLoaded from 'imagesloaded';
import MiPopup from '../../../components/MiPopup';
import MiCount from '../../../components/MiCount';

class Wrapper extends Component{
        constructor(props) {
                super(props);
                this.state = {
                        bannerIndex: 0,
                        isShopping: false,
                        count: 1
                };
                this.endShopping = this.endShopping.bind(this);
                this.buy = this.buy.bind(this);
        }
        _initBannerScroll() {
                setTimeout(() => {                  //保证 bannerScroll 区域的 dom 元素更新完毕-----$nextTick() 作用 与 setTimeout 效果相同，都是延迟一段时间
                        imagesLoaded( this.refs.banner, () => {         //保证 iscroll 区域所有的图片加载完毕
                                setTimeout(() => {                                  //保证 iscroll 区域所有的样式 渲染完毕
                                        this.bannerScroll = new IScroll(this.refs.banner, {
                                                scrollY: false,   //关闭纵向滚动
                                                scrollX: true,    //开始横向滚动
                                                momentum: false,  //关闭惯性滚动
                                                snap: true        //开启轮播图滚动
                                        });
                                        this.bannerScroll.on('scrollStart', () => {
                                                clearTimeout(this.timer); //停止自动播放
                                        });
                                        this.bannerScroll.on('scrollEnd', () => {
                                                // 调整整个滚动条的位置，实现无缝滚动
                                                let len = this.refs.banner.querySelectorAll('li').length;
                                                if(this.bannerScroll.currentPage.pageX === 0){
                                                        this.bannerScroll.disable();   //调整期间，禁止滚动
                                                        setTimeout(() => {
                                                                this.bannerScroll.goToPage(len - 2, 0, 0);
                                                                this.bannerScroll.enable();  //调整结束，恢复滚动
                                                        },10);
                                                }
                                                if(this.bannerScroll.currentPage.pageX === len - 1){
                                                        this.bannerScroll.disable();  //调整期间，禁止滚动
                                                        setTimeout(() => {
                                                                this.bannerScroll.goToPage(1, 0, 0);
                                                                this.bannerScroll.enable();   //调整结束，恢复滚动
                                                        },10);
                                                }
                                                let curPage = this.bannerScroll.currentPage.pageX;
                                                if(curPage === 0) this.setState({ bannerIndex : len - 2 });
                                                else if(curPage === len - 1) this.setState({ bannerIndex : 1 });
                                                else this.setState({ bannerIndex : curPage });
                                                this.timer = setTimeout(() => this.bannerScroll.next(),3000);
                                        });
                                        this.bannerScroll.goToPage(1,0,0);   //初始化显示第二页（第一张图片片）
                                        this.setState({ bannerIndex : 1 });                           //记录当前更新时第几张
                                        this.timer = setTimeout(() => this.bannerScroll.next(),3000);//开始自动播放
                                },17);
                        });
                },17);
        }
        endShopping() { this.setState({ isShopping: false })}
        buy() {
                this.props.buy(this.state.count)
                        .then(() => {
                                this.setState({
                                        count: 1,
                                        isShopping: false
                                });
                                alert("添加成功");
                        });
        }
        render() {
                let { isShopping, count } = this.state;
                let { model, cartCount } = this.props;
                let bannerImgs = model.bannerImgs ? model.bannerImgs.split(",") : [];
                return (
                        <div className={ style["page-wrapper"] }>
                                <div className={style["header"]}>
                                        <a  onClick={ () => this.props.history.goBack()} className="iconfont icon-back"></a>
                                        <Link to="/" className="iconfont icon-home"></Link>
                                </div>
                                <div className={style["content"]}>
                                        <div className={style["banner"]} ref="banner">
                                                {bannerImgs.length > 0 && (
                                                        <ul style={{width: (bannerImgs.length + 2) + "00%"} }>
                                                                <li><img src={ bannerImgs[bannerImgs.length - 1] } alt="" /></li>
                                                                { bannerImgs.map((item,i) => (
                                                                        <li  key={ i }>
                                                                                <img src={ item } alt="" />
                                                                        </li>
                                                                ))}
                                                                <li><img src={ bannerImgs[0] } alt="" /></li>
                                                        </ul>
                                                )}
                                                <span className={style["indicator"]}>{ this.state.bannerIndex }/ { bannerImgs.length }</span>
                                        </div>
                                        <em className={style["price"]}>￥ { model.price }</em>
                                        <h1 className={style["name"]} >{ model.name }</h1>
                                        <p className={style["remark ellipsis"] } >{ model.remark }</p>
                                </div>
                                <div className={style["footer"]}>
                                        <Link to="/cart" className={style["cart"]}>
                                                <i className="iconfont icon-cart"></i>
                                                <span>购物车</span>
                                                {cartCount > 0 && (
                                                        <em className={style["shopping-count"]} >{cartCount}</em>
                                                )}
                                        </Link>
                                        <button className={style["btn-popup"]} onClick={ () => this.setState({ isShopping : true } )}>加入购物车</button>
                                </div>
                                <MiPopup isShow={ isShopping } close={ this.endShopping } align="bottom">
                                        <div className={style["shopping-dialog"]}>
                                                <div className={style["shopping-dialog-header"]}>
                                                        <img className={style["avatar"]} src={ model.avatar } alt="" />
                                                        <em className={style["price"]}>￥{model.price}</em>
                                                </div>
                                                <div className={style["shopping-dialog-content"]}>
                                                        <span className={style["title"]}>数量</span>
                                                        <div className={style["count-wrapper"]}>
                                                                <MiCount
                                                                        count={ count }
                                                                        increase={ () => this.setState({ count : count + 1 }) }
                                                                        decrease={ () => this.setState({ count : count - 1 }) } >
                                                                </MiCount>
                                                        </div>
                                                </div>
                                                <div className={style["shopping-dialog-footer"]}>
                                                        <button className={style["btn-add-cart"]} onClick={ this.buy }>确定</button>
                                                </div>
                                        </div>
                                </MiPopup>
                        </div>
                );
        }
        componentWillReceiveProps(nextProps) {
                this.needInitBanner = this.props.model.bannerImgs !== nextProps.model.bannerImgs && nextProps.model.bannerImgs.length > 0;
        }
        componentDidUpdate() {
                if(this.needInitBanner ) { this._initBannerScroll(); this.needInitBanner = false; }
        }
}

export default withRouter(Wrapper);