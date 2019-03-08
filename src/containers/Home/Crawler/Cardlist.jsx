import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import BChart from 'BChart';

import SvgIcon from '../../../components/SvgIcon';
import NumberFormat from '../../../components/util/NumberFormat';
import EasyToast from '../../../components/EasyToast';
import Toast from '../../../components/Toast';

const cardWidth = 188;

class Cardlist extends Component {
  static propTypes = {
    cardDataList: PropTypes.oneOfType([PropTypes.array]).isRequired,
    onSelect: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    updateKeywords: PropTypes.func.isRequired,
    fetchVisitPagesData: PropTypes.func.isRequired,
    activePageType: PropTypes.string.isRequired,
    selectedIndex: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      left: 0,
      maxLeft: 0,
      visible: false,
      msg: '',
      iconType: 'info'
    };
  }

  componentDidMount() {
    const {
      cardDataList
    } = this.props;
    const cardCount = this.getCardItemCount();
    this.state.maxLeft = cardDataList.length === 0 ? 0 :
      Math.floor((cardDataList.length - 1) / cardCount) * (cardWidth * cardCount);

    this.forceUpdate();
  }

  shouldComponentUpdate(props, state) {
    return (
      JSON.stringify(this.props) !== JSON.stringify(props) ||
      JSON.stringify(this.state) !== JSON.stringify(state)
    );
  }

  componentWillUpdate(props) {
    const {
      cardDataList
    } = props;
    const cardCount = this.getCardItemCount();

    const maxLeft = cardDataList.length === 0 ? 0 :
      Math.floor((cardDataList.length - 1) / cardCount) * (cardWidth * cardCount);

    if (Math.abs(this.state.left) > maxLeft) {
      this.state.left = -maxLeft;
    }

    this.state.maxLeft = maxLeft;
  }

  onCardItemSelect(index, cardItem) {
    const {
      onSelect,
      handleChange
    } = this.props;
    const count = this.getCardItemCount();

    const left = Math.abs(this.state.left);

    if (left < ((index + 1) - count) * cardWidth) {
      this.state.left -= count * cardWidth;
      this.forceUpdate();
    }
    handleChange('uri_stem', cardItem.url);
    onSelect(index);
  }

  // cardList中card容量
  getCardItemCount() {
    const width = this.cardBody.getBoundingClientRect().width;
    return Math.floor(width / cardWidth);
  }

  // 删除页面
  delPage(cardItem) {
    const {
      updateKeywords,
      fetchVisitPagesData
    } = this.props;

    const params = [{
      keyword: cardItem.url,
      is_ignored: true,
      keyword_type: 'page'
    }];

    updateKeywords(params, (res) => {
      if (res) {
        this.setState({
          msg: '此页面已删除，可在垃圾箱中恢复。',
          visible: true,
          iconType: 'info'
        });
        fetchVisitPagesData();
      } else {
        this.setState({
          msg: '删除页面失败',
          visible: true,
          iconType: 'warning'
        });
      }
    });
  }

  // 关注页面
  followPage(cardItem) {
    const {
      updateKeywords,
      fetchVisitPagesData
    } = this.props;

    const params = [{
      keyword: cardItem.url,
      is_followed: true,
      keyword_type: 'page'
    }];

    updateKeywords(params, (res, msg) => {
      if (res) {
        this.setState({
          msg: '关注页面成功',
          visible: true,
          iconType: 'info'
        });
        fetchVisitPagesData();
      } else {
        this.setState({
          msg,
          visible: true,
          iconType: 'warning'
        });
      }
    });
  }

  render() {
    const {
      cardDataList,
      selectedIndex,
      activePageType
    } = this.props;

    const {
      left,
      maxLeft,
      visible,
      msg,
      iconType
    } = this.state;

    return (
      <div className="card-list">
        <button
          className="prev-btn"
          disabled={left === 0}
          onClick={() => {
            const count = this.getCardItemCount();

            this.state.left += count * cardWidth;
            if (this.state.left > 0) {
              this.state.left = 0;
            }

            this.forceUpdate();
          }}
        >
          <i className="iconfont icon-left" />
        </button>
        <button
          className="next-btn"
          disabled={Math.abs(left) >= maxLeft}
          onClick={() => {
            const count = this.getCardItemCount();
            this.state.left -= count * cardWidth;

            this.forceUpdate();
          }}
        >
          <i className="iconfont icon-right" />
        </button>
        <div
          ref={(node) => {
            this.cardBody = node;
          }}
          className="card-container"
        >
          <div className="card-body" style={{ left: `${left}px` }}>
            {
              _.map(cardDataList, (cardItem, index) => {
                // 导入数量转换
                const uploadBytes = NumberFormat(cardItem.upload_bytes, 'byte');

                return (
                  <div
                    key={index}
                    className={`card-item${selectedIndex === index ? ' active' : ''}`}
                    onClick={() => this.onCardItemSelect(index, cardItem)}
                    role="presentation"
                  >
                    <p className="page-url" title={cardItem.url}>{cardItem.url}</p>
                    <div className="card-content1">
                      <EasyToast overlayClassName="card-overlay" trigger="hover" placement="top" overlay="爬虫占比">
                        <div className="item-count">
                          <SvgIcon iconName="crawler" className="count-icon" />
                          {`${((cardItem.crawler_count / cardItem.count) * 100).toFixed(1)}%`}
                        </div>
                      </EasyToast>
                      <EasyToast overlayClassName="card-overlay" trigger="hover" placement="top" overlay="总请求数">
                        <div className="item-count">
                          <i className="iconfont icon-appstoreo count-icon" />
                          {NumberFormat(cardItem.count)}
                        </div>
                      </EasyToast>
                    </div>
                    <div className="card-content2">
                      <EasyToast overlayClassName="card-overlay" trigger="hover" placement="top" overlay="上行数据量">
                        <div className="item-count">
                          <i className="iconfont icon-barchart count-icon" />
                          {parseFloat(uploadBytes.value.toFixed(2))}
                          <span className="unit"> {uploadBytes.unit}</span>
                        </div>
                      </EasyToast>
                      <EasyToast overlayClassName="card-overlay" trigger="hover" placement="top" overlay="延迟(毫秒)">
                        <div className="item-count">
                          <SvgIcon iconName="delay" className="count-icon" />
                          {Math.round(cardItem.latency)}
                          <span className="unit"> ms</span>
                        </div>
                      </EasyToast>
                    </div>
                    <div className={`card-footer ${activePageType === 'CARE' ? 'is-follow' : ''}`}>
                      <i
                        className="iconfont icon-staro"
                        onClick={() => this.followPage(cardItem)}
                        role="presentation"
                      />

                      <EasyToast overlayClassName="card-overlay" trigger="hover" placement="top" overlay="忽略此页面">
                        <i
                          className="iconfont icon-delete"
                          onClick={() => this.delPage(cardItem)}
                          role="presentation"
                        />
                      </EasyToast>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
        <Toast
          visible={visible}
          iconType={iconType}
          onClose={() => this.setState({ visible: false })}
          duration={3000}
        >
          {msg}
        </Toast>
      </div>
    );
  }
}
export default Cardlist;
