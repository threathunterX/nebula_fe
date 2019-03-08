import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BChart from 'BChart';
import _ from 'lodash';
import moment from 'moment';

import GetColor from '../../../components/util/GetColor';
import NumberFormat from '../../../components/util/NumberFormat';

class WeekTrend extends Component {
  static propTypes = {
    trend_week: PropTypes.oneOfType([PropTypes.object]).isRequired,
    trend_day: PropTypes.arrayOf(PropTypes.object).isRequired,
    onSelectDay: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      keyword: '',
      selectDate: '',
      curDate: moment().startOf('day').format('YYYY.MM.DD'),
      statisticsScore: 0,
      upRate: 0
    };
  }

  shouldComponentUpdate(props, state) {
    const {
      trend_week,
      trend_day
    } = this.props;

    return (
      (props.trend_day.length > 0) &&
      (
        JSON.stringify(trend_week) !== JSON.stringify(props.trend_week) ||
        JSON.stringify(trend_day) !== JSON.stringify(props.trend_day) ||
        JSON.stringify(this.state) !== JSON.stringify(state)
      )
    );
  }

  componentWillUpdate(props) {
    const {
      trend_week,
      trend_day
    } = props;

    this.state.statisticsScore = _.sumBy(trend_day, o => o.y);

    const risk_count = trend_week.risk_count;
    if (this.state.selectDate === '') {
      this.state.selectDate = moment(Number(_.get(risk_count[risk_count.length - 1], 'x', 0))).format('YYYY.MM.DD');
    }

    // 设置选中编号
    const time = moment(this.state.selectDate, 'YYYY.MM.DD').valueOf();
    const selectedIndex = _.findIndex(risk_count, { x: `${time}` });
    const lastDay = _.get(risk_count[selectedIndex], 'y', 0);
    const last2Day = _.get(risk_count[selectedIndex - 1], 'y', -1);
    this.state.upRate = (lastDay - last2Day) / last2Day;
    if (last2Day === 0 || lastDay === 0) {
      this.state.upRate = 0;
    }

    if (trend_week.all_count.length > 0) {
      this.showWeekTrend(
        trend_week.all_count,
        trend_week.risk_count
      );
    }

    if (trend_day.length > 0) {
      this.showDayTrend(trend_day);
    }
  }

  componentDidUpdate() {
    // 更新数据后调用resize，刷新图表尺寸
    const e = document.createEvent('Event');
    e.initEvent('resize', true, true);
    window.dispatchEvent(e);
  }

  showDayTrend(data) {
    const legend = this.props.type === 'user' ? '风险用户数' : '爬虫请求';

    new BChart('#daily_statistics')
    // 基本配置
      .setConfig({
        name: 'dayTend',
        type: 'line',
        lineType: 'area',
        showPoint: false,
        lineWidth: 2,
        interpolate: 'monotone',
        gradient: {
          type: 'vertical',
          color: ['#FF5E76', '#22C3F7']
        },
        data
      })
      .setFixedPadding({ left: 0, right: 0 })
      // x轴配置
      .setXAxis({
        boundaryGap: false,
        markCount: 3,
        gridLine: false,
        textPos: 'left'
      })
      // Y轴配置
      .setYAxis({
        markType: 'all',
        border: false,
        show: false,
        markCount: 4
      })
      .setHoverCursor(true)
      .setHoverText(params => [`${legend}:${parseInt(params.y, 10)}`, params.x])
      // 构建图表
      .build();
  }

  showWeekTrend(allCount, riskCount) {
    const maxObj = _.maxBy(allCount, o => o.y);
    const maxValue = maxObj ? maxObj.y : 0;
    // 格式化数据
    const formatRiskCount = _.map(riskCount, (item) => {
      // 计算渐变颜色
      const startColor = GetColor('#FF5E76', '#22C3F7', item.y / maxValue);
      return Object.assign(item, { color: [startColor, '#22C3F7'] });
    });

    const time = moment(this.state.selectDate, 'YYYY.MM.DD').valueOf();
    const selectedIndex = _.findIndex(allCount, { x: `${time}` });

    new BChart('#week_trend')
    // 基本配置
      .setConfig([{
        name: this.props.type === 'user' ? '总用户数' : '总请求',
        type: 'bar',
        color: '#353D52',
        barSplit: 1,
        barWidth: '0.25',
        data: allCount
      }, {
        name: this.props.type === 'user' ? '风险用户数' : '爬虫请求',
        type: 'bar',
        barWidth: '0.25',
        data: formatRiskCount
      }])
      // x轴配置
      .setXAxis({
        gridLine: false,
        format(p) {
          return moment(Number(p)).format('MM.DD');
        }
      })
      // Y轴配置
      .setYAxis({
        markType: 'all',
        border: false,
        markCount: 4
      })
      .setHoverCursor(true)
      .setHoverTitle(params => moment(Number(params.x)).format('YYYY.MM.DD'))
      .setHoverText(
        params => `${params.name}:${parseInt(params.y, 10)}`,
        { posFree: true }
      )
      .setClickCursor(true, allCount[selectedIndex], (param) => {
        this.props.onSelectDay(param.value.x);
        this.setState({
          selectDate: moment(Number(param.value.x)).format('YYYY.MM.DD')
        });
      })
      // 构建图表
      .build();
  }

  render() {
    const {
      selectDate,
      statisticsScore,
      curDate,
      upRate
    } = this.state;

    return (
      <div className="week-trend-container">
        <div className="week-trend">
          <h2>
            一周趋势
            <div className="legend-container">
              <i className="user-legend" />
              <span>{this.props.type === 'user' ? '总用户数' : '总请求'}</span>
              <i className="risk-user-legend" />
              <span>{this.props.type === 'user' ? '风险用户数' : '爬虫请求'}</span>
            </div>
          </h2>
          <div id="week_trend" />
        </div>

        <div className="day-statistics">
          <h2>
            {curDate === selectDate ? '今日统计' : '当日统计'}
            <span>{selectDate}</span>
          </h2>
          <div className="day-statistics-content">
            <div className="statistics-score">
              <span className="score-num">{NumberFormat(Number(statisticsScore))}</span>
              <span className="score-text">{this.props.type === 'user' ? '总风险用户数' : '总爬虫请求'}</span>
            </div>
            {
              upRate === 0 ? (
                <div className="percent-label">
                  <i className="iconfont icon-minus" />
                  <i className="iconfont icon-minus" />
                </div>
              ) : (
                <div className={`percent-label ${upRate > 0 ? 'up' : 'down'}`}>
                  <i className={`iconfont icon-arrow${upRate > 0 ? 'up' : 'down'}`} />
                  <span className="">{(Math.abs(upRate) * 100).toFixed(1)}%</span>
                </div>
              )
            }
            <div id="daily_statistics" />
          </div>
        </div>
      </div>
    );
  }
}
export default WeekTrend;
