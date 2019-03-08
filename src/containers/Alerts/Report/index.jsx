import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import URI from 'urijs';

import HttpService from '../../../components/HttpService';
import Loading from './Loading';
import RiskTrendType from './RiskTrendType';
import UserIPRisk from './UserIPRisk';
import UrlTable from './UrlTable';
import IpGeoChart from './IpGeoChart';

import './index.scss';

const colorList = ['#FF5E76', '#EC6FC7', '#AD82E7', '#6EA2E7', '#22C3F7', '#525E7F'];
const pdfName = 'report';

const logoImg = require('../../../containers/Login/logo.svg');

class Report extends Component {
  static propTypes = {
    location: PropTypes.oneOfType([PropTypes.object]).isRequired
  };

  static getUserTableColumns(tableData) {
    return [{
      title: '风险USER Top10',
      dataIndex: 'name',
      key: 'name',
      width: '35%',
      render: text => <span className="light-label">{text}</span>
    }, {
      title: '风险类型',
      dataIndex: 'type',
      key: 'type',
      render: item => (
        _.map(item, (count, key) => {
          const sum = _.sum(Object.values(item));
          const percent = `${Math.round((count * 100) / sum)}%`;
          return (
            <div key={key} className="label-container">
              <span>{key}</span>
              <span className="label">{percent}</span>
            </div>
          );
        })
      )
    }, {
      title: '报警次数与时间分布',
      dataIndex: 'count',
      key: 'count',
      width: '180px',
      render: (item, record) => {
        const index = _.findIndex(tableData, o => o.name === record.name);
        return (
          <div>
            <div id={`userRisk${index}`} className="table-risk-line" />
            <span className={index < 2 ? 'warning-text' : ''}>{item}</span>
          </div>
        );
      }
    }];
  }

  static getIPTableColumns(tableData) {
    return [{
      title: '风险IP Top10',
      dataIndex: 'name',
      key: 'name',
      width: '18%',
      render: text => <span className="light-label">{text}</span>
    }, {
      title: '地理位置',
      dataIndex: 'geo_city',
      key: 'geo_city',
      width: '17%'
    }, {
      title: '风险类型',
      dataIndex: 'type',
      key: 'type',
      render: item => (
        _.map(item, (count, key) => {
          const sum = _.sum(Object.values(item));
          const percent = `${Math.round((count * 100) / sum)}%`;
          return (
            <div key={key} className="label-container">
              <span>{key}</span>
              <span className="label">{percent}</span>
            </div>
          );
        })
      )
    }, {
      title: '报警次数与时间分布',
      dataIndex: 'count',
      key: 'count',
      width: '180px',
      render: (item, record) => {
        const index = _.findIndex(tableData, o => o.name === record.name);
        return (
          <div>
            <div id={`ipRisk${index}`} className="table-risk-line" />
            <span className={index < 2 ? 'warning-text' : ''}>{item}</span>
          </div>
        );
      }
    }];
  }

  static getPageTableColumns(tableData) {
    return [{
      title: '风险IP访问主要HOST&URL',
      dataIndex: 'name',
      key: 'name',
      render: text => <span className="light-label">{text}</span>
    }, {
      title: '报警次数与时间分布',
      dataIndex: 'count',
      key: 'count',
      width: '180px',
      render: (item, record) => {
        const index = _.findIndex(tableData, o => o.name === record.name);
        return (
          <div>
            <div id={`pageRisk${index}`} className="table-risk-line" />
            <span className={index < 2 ? 'warning-text' : ''}>{item}</span>
          </div>
        );
      }
    }];
  }

  // 设置画布padding
  static setSvgPadding(svgTemp, type) {
    const svg = svgTemp;
    if (svg.style[type] === '') {
      svg.style[type] = '10px';
    }

    return svg.style[type].toUpperCase().replace('PX', '');
  }

  // svg样式重置
  static formatSVGStyles(svgTemp) {
    const svg = svgTemp;

    const width = svg.getBoundingClientRect().width;
    const height = svg.getBoundingClientRect().height;

    let paddingLeft = svg.style.paddingLeft;
    paddingLeft = Report.setSvgPadding(svg, 'paddingLeft');
    let paddingRight = svg.style.paddingRight;
    paddingRight = Report.setSvgPadding(svg, 'paddingRight');
    let paddingTop = svg.style.paddingTop;
    paddingTop = Report.setSvgPadding(svg, 'paddingTop');
    let paddingBottom = svg.style.paddingBottom;
    paddingBottom = Report.setSvgPadding(svg, 'paddingBottom');

    const innerWidth = width - paddingLeft - paddingRight;
    const innerHeight = height - paddingTop - paddingBottom;

    // 固定宽度
    svg.setAttribute('width', width);
    svg.style.fontFamily = "'Helvetica Neue', 'Hiragino Sans GB', 'WenQuanYi Micro Hei', 'Microsoft Yahei', sans-serif";
    svg.style.webkitFontSmoothing = 'antialiased';

    // 坐标轴转换
    const axisLines = svg.querySelectorAll('.axis-line');

    axisLines.forEach((axisLine) => {
      if (axisLine.getAttribute('x1') === '100%') {
        axisLine.setAttribute('x1', innerWidth);
      }
      if (axisLine.getAttribute('y1') === '100%') {
        axisLine.setAttribute('y1', innerHeight);
      }
      if (axisLine.getAttribute('x2') === '100%') {
        axisLine.setAttribute('x2', innerWidth);
      }
      if (axisLine.getAttribute('y2') === '100%') {
        axisLine.setAttribute('y2', innerHeight);
      }
    });
    // 坐标网格转换
    const gridLines = svg.querySelectorAll('.grid-line');
    gridLines.forEach((gridLine) => {
      if (gridLine.getAttribute('x1').indexOf('%') >= 0) {
        const scale = gridLine.getAttribute('x1').replace('%', '') / 100;
        gridLine.setAttribute('x1', scale * innerWidth);
      }
      if (gridLine.getAttribute('y1').indexOf('%') >= 0) {
        const scale = gridLine.getAttribute('y1').replace('%', '') / 100;
        gridLine.setAttribute('y1', innerHeight * scale);
      }
      if (gridLine.getAttribute('x2').indexOf('%') >= 0) {
        const scale = gridLine.getAttribute('x2').replace('%', '') / 100;
        gridLine.setAttribute('x2', scale * innerWidth);
      }
      if (gridLine.getAttribute('y2').indexOf('%') >= 0) {
        const scale = gridLine.getAttribute('y2').replace('%', '') / 100;
        gridLine.setAttribute('y2', innerHeight * scale);
      }
    });
    // 文字位置转换
    const texts = svg.querySelectorAll('text');
    texts.forEach((text) => {
      if (text.getAttribute('x').indexOf('%') >= 0) {
        const scale = text.getAttribute('x').replace('%', '') / 100;
        text.setAttribute('x', scale * innerWidth);
      }
      if (text.getAttribute('y').indexOf('%') >= 0) {
        const scale = text.getAttribute('y').replace('%', '') / 100;
        text.setAttribute('y', innerHeight * scale);
      }
    });
    // 矩形转换
    const rects = svg.querySelectorAll('rect');
    rects.forEach((rect) => {
      if (rect.getAttribute('width') && rect.getAttribute('width').indexOf('%') >= 0) {
        const scale = rect.getAttribute('width').replace('%', '') / 100;
        rect.setAttribute('width', scale * innerWidth);
      }
      if (rect.getAttribute('height') && rect.getAttribute('height').indexOf('%') >= 0) {
        const scale = rect.getAttribute('height').replace('%', '') / 100;
        rect.setAttribute('height', scale * innerHeight);
      }
      if (rect.getAttribute('x').indexOf('%') >= 0) {
        const scale = rect.getAttribute('x').replace('%', '') / 100;
        rect.setAttribute('x', scale * innerWidth);
      }
      if (rect.getAttribute('y').indexOf('%') >= 0) {
        const scale = rect.getAttribute('y').replace('%', '') / 100;
        rect.setAttribute('y', innerHeight * scale);
      }
    });
  }

  static makeStyleObject(rule) {
    const styleDec = rule.style;
    const output = {};
    let s;

    for (s = 0; s < styleDec.length; s += 1) {
      output[styleDec[s]] = styleDec[styleDec[s]];
      if (styleDec[styleDec[s]] === undefined) {
        // firefox being firefoxy
        output[styleDec[s]] = styleDec.getPropertyValue(styleDec[s]);
      }
    }

    return output;
  }

  static inlineAllStyles() {
    let svg_style;
    let page_style = [];
    let selector;
    const styleSheets = document.styleSheets;

    Object.keys(styleSheets).forEach((key) => {
      const styleSheet = styleSheets[key];
      // loop through your stylesheets
      if (key === '0') {
        // pull out the styles from the one you want to use
        if (styleSheet.rules !== undefined) {
          svg_style = styleSheet.rules;
        } else {
          svg_style = styleSheet.cssRules;
        }
      }

      let rule;
      if (styleSheet.rules !== undefined) {
        rule = styleSheet.rules;
      } else {
        rule = styleSheet.cssRules;
      }
      // 当前页面样式
      if (rule[0] && rule[0].selectorText && rule[0].selectorText.indexOf('wd-report') >= 0) {
        page_style = rule;
      }
    });

    if (svg_style !== null && svg_style !== undefined) {
      for (let i = 0; i < svg_style.length; i += 1) {
        if (svg_style[i].type === 1 && svg_style[i].selectorText.indexOf('svg-container') > -1) {
          selector = svg_style[i].selectorText;

          const styles = Report.makeStyleObject(svg_style[i]);

          if (selector.indexOf('svg-view') >= 0 ||
            selector === ('.svg-container') ||
            selector.indexOf('data-area') >= 0 ||
            selector.indexOf('data-bar') >= 0 ||
            selector.indexOf('data-line') >= 0) {
            if (selector.indexOf('data-line') >= 0) {
              d3.selectAll(selector).style({ fill: 'none' });
            }
            if (selector.indexOf('svg-view') >= 0) {
              d3.selectAll(selector).style({
                'box-sizing': 'border-box'
              });
            }
            if (selector === ('.svg-container')) {
              d3.selectAll(selector).style({ 'over-flow': 'visible' });
            }
          } else {
            // Apply the style directly to the elements that match the selctor
            // (this requires to not have to deal with selector parsing)
            d3.selectAll(selector).style(styles);
          }
        }
      }

      Object.keys(page_style).forEach((key) => {
        const report = page_style[key];
        if (report.type === 1 && (
            report.selectorText.indexOf('x-axis-text') >= 0 ||
            report.selectorText.indexOf('y-right-axis-text') >= 0
          )) {
          const styles = Report.makeStyleObject(report);
          d3.selectAll(report.selectorText).style(styles);
        }
      });
    }
  }

  static jspdf() {
    // 样式提取
    Report.inlineAllStyles();

    const body = document.body;
    body.style.height = 'auto';

    const svgs = body.querySelectorAll('.svg-container');

    for (let i = 0; i < svgs.length; i += 1) {
      const svgContainer = svgs[i];
      const img = document.createElement('img');

      const svg = svgContainer.querySelector('svg');
      if (svg) {
        Report.formatSVGStyles(svg);

        img.style.width = '100%';
        img.style.height = `${svg.getBoundingClientRect().height}px`;
        img.style.display = 'block';

        const svg_xml = (new XMLSerializer()).serializeToString(svg);
        img.src = `data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(svg_xml)))}`;

        svgContainer.appendChild(img);
        svg.remove();
      }
    }

    html2canvas(body, {
      onrendered(canvas) {
        const imgData = canvas.toDataURL('image/png');

        let type = 'p';
        if (canvas.width > canvas.height) {
          type = 'l';
        }
        const doc = new JsPDF(type, 'px', [canvas.width, canvas.height]);
        // 第一列 左右边距  第二列上下边距  第三列是图片左右拉伸  第四列 图片上下拉伸
        doc.addImage(imgData, 'png', 0, 0, canvas.width, canvas.height);
        doc.save(`${pdfName}.pdf`);
      }
    });
  }

  constructor(props) {
    super(props);

    this.state = {
      loadComplete: false,
      hideLoading: false,
      loadFail: false,
      riskTrend: [],
      riskTagTop: [],
      riskBlockStatUser: 0,
      riskDiscoverStatUser: 0,
      riskUserTop: [],
      riskBlockStatIp: 0,
      riskDiscoverStatIp: 0,
      riskIpTop: [],
      riskGeoTop: [],
      riskUrlTop: []
    };
  }

  componentDidMount() {
    this.getReportData();
  }

  // 获取风险名单分析
  getReportData() {
    const {
      location
    } = this.props;

    const params = URI(location.search).query(true);

    HttpService.get({
      url: 'platform/stats/notice_report',
      params,
      onSuccess: (data) => {
        if (data.status === 200) {
          const {
            // 风险名单趋势
            risk_trend,
            // 风险名单类型分布
            risk_tag_top,
            // 拦截风险账号总数
            risk_block_stat_user,
            // 风险账号总数
            risk_discover_stat_user,
            // 风险userTop10
            risk_user_top,
            // 拦截风险IP总数
            risk_block_stat_ip,
            // 风险IP总数
            risk_discover_stat_ip,
            // 风险ipTop10
            risk_ip_top,
            // 风险IP地理位置top8
            risk_geo_top,
            // 风险IP主要访问地址top10
            risk_url_top
          } = data.values;

          // 风险名单趋势格式化
          const riskTrend = _.map(risk_trend, item => ({
            x: Object.keys(item)[0],
            y: Object.values(item)[0]
          }));

          // 风险名单趋势格式化
          const riskTagTop = _.map(risk_tag_top, (item, index) => ({
            text: Object.keys(item)[0],
            value: Object.values(item)[0],
            color: colorList[index]
          }));

          // 风险IP地理位置top8格式化
          const riskGeoTop = _.map(risk_geo_top, item => ({
            x: Object.keys(item)[0],
            y: Object.values(item)[0]
          }));

          this.setState({
            riskTrend,
            riskTagTop,
            riskBlockStatUser: risk_block_stat_user,
            riskDiscoverStatUser: risk_discover_stat_user,
            riskUserTop: risk_user_top,
            riskBlockStatIp: risk_block_stat_ip,
            riskDiscoverStatIp: risk_discover_stat_ip,
            riskIpTop: risk_ip_top,
            riskGeoTop,
            riskUrlTop: risk_url_top,
            loadComplete: true
          });
        } else {
          this.setState({ loadFail: true });
        }
      },
      onError: () => {
        this.setState({ loadFail: true });
      }
    });
  }

  render() {
    const {
      loadComplete,
      hideLoading,
      loadFail,
      riskTrend,
      riskTagTop,
      riskBlockStatUser,
      riskDiscoverStatUser,
      riskUserTop,
      riskBlockStatIp,
      riskDiscoverStatIp,
      riskIpTop,
      riskGeoTop,
      riskUrlTop
    } = this.state;

    const {
      location
    } = this.props;
    const query = URI(location.search).query(true);

    return (
      <div className="wd-report">

        {
          loadComplete ? (

            <div className="report-container">

              <h1>
                <img className="logo" src={logoImg} alt="logo" />

                <div className="title-container">
                  <p className="title-text">风险名单分析</p>

                  <p className="time-range">
                    报告时间范围：{moment(Number(query.fromtime)).format('YYYY.MM.DD HH')}时
                    - {moment(Number(query.endtime)).format('YYYY.MM.DD HH')}时
                  </p>
                </div>

                <button
                  className="main-btn middle-btn"
                  onClick={() => {
                    Report.jspdf();
                  }}
                >
                  <i className="iconfont icon-upload" />
                  导出PDF
                </button>
              </h1>

              <RiskTrendType lineData={riskTrend} pieData={riskTagTop} />

              {
                riskUserTop.length === 0 ? null :
                  (
                    <div className="risk-container">
                      <UserIPRisk
                        type="user"
                        blockData={[riskBlockStatUser, riskDiscoverStatUser]}
                        tableData={riskUserTop}
                        tableColumns={Report.getUserTableColumns(riskUserTop)}
                      />
                    </div>
                  )
              }

              <div className="risk-container">
                {
                  riskIpTop.length === 0 ? null :
                    (
                      <UserIPRisk
                        type="ip"
                        blockData={[riskBlockStatIp, riskDiscoverStatIp]}
                        tableData={riskIpTop}
                        tableColumns={Report.getIPTableColumns(riskIpTop)}
                      />
                    )
                }

                <div className="geo-url-container" style={riskIpTop.length === 0 ? { marginTop: '16px' } : undefined}>

                  <IpGeoChart barData={riskGeoTop} />
                  <UrlTable
                    tableData={riskUrlTop}
                    tableColumns={Report.getPageTableColumns(riskUrlTop)}
                  />
                </div>
              </div>

            </div>
          ) : null
        }

        {
          hideLoading ?
            null :
            <Loading
              complete={loadComplete}
              loadFail={loadFail}
              hideComplete={() => {
                this.setState({ hideLoading: true });
              }}
            />
        }
      </div>
    );
  }
}

export default Report;
