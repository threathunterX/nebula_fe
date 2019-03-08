import React, { Component } from 'react';
import _ from 'lodash';

import TabBar from '../../components/TabBar';
import Notification from '../../components/Notification';
import MailAlarm from './MailAlarm';
import TrafficFilter from './TrafficFilter';
import ShowLogManage from './ShowLogManage';
import SuffixEncrypt from './SuffixEncrypt';
import ConfigService from './ConfigService';

import './index.scss';

const notification = Notification.getNewInstance();

class SystemConfig extends Component {

  static 
  validate(configs) {
    let error = false;

    _.forIn(configs, (item) => {
      error = (error || (item.error === true));
    });

    return !error;
  }

  static save(configs, prefix) {
    if (!SystemConfig.validate(configs)) {
      notification.warning({
        message: '请按照正确格式填写'
      });
      return;
    }

    ConfigService.saveConfigs(configs, prefix)
      .then(() => {
        notification.info({
          message: '成功保存'
        });
      })
      .catch(() => {
        notification.error({
          message: '保存失败'
        });
      });
  }

  constructor(props) {
    super(props);
    this.state = {
      selectIndex: 0,
      describe: '通过对邮件报警的配置，您可以通过邮件方式获取nebula发现的风险问题汇报，请您填写下方配置以完成对报警邮件的设定，如果您不清楚以下内容该如何填写，请咨询您的公司技术人员以获得详细信息或者联系hi@threathunter.cn以获得帮助。',
      settingTabs: [
        {
          tabText: '邮件报警'
        },
        {
          tabText: '网络流量过滤'
        },
        {
          tabText: '日志显示管理'
        },
        {
          tabText: '敏感字段加密'
        }
      ]
    };
  }

  // 获取系统配置内容
  getConfigContent() {
    switch (this.state.selectIndex) {
      case 0:
        return (
          <MailAlarm
            onSave={(e, configs) => {
              
              SystemConfig.save(configs, 'alerting');
            }}
            onCancel={(e, configs) => {
              this.cancel(configs, 'alerting');
            }}
          />
        );
      case 1:
        return (
          <TrafficFilter
            onSave={(e, configs) => {
              SystemConfig.save(configs, 'filter.traffic');
            }}
            onCancel={(e, configs) => {
              this.cancel(configs, 'filter.traffic');
            }}
          />
        );
      case 2:
        return (
          <ShowLogManage
            onSave={(e, configs) => {
              SystemConfig.save(configs, 'filter.log');
            }}
            onCancel={(e, configs) => {
              this.cancel(configs, 'filter.log');
            }}
          />
        );
      case 3:
        return (
          <SuffixEncrypt
            onSave={(e, configs) => {
              SystemConfig.save(configs, 'filter.encryption');
            }}
            onCancel={(e, configs) => {
              this.cancel(configs, 'filter.encryption');
            }}
          />
        );
      default :
        return '';
    }
  }

  cancel(configs, part) {
    ConfigService.getConfigs(part, configs)
      .then((data) => {
        this.setState(data);
      });
  }

  // 选择页签
  selectTab(item) {
    let describe = '';

    const selectIndex = item.tabIndex;

    if (selectIndex === 0) {
      describe = '通过对邮件报警的配置，您可以通过邮件方式获取nebula发现的风险问题汇报，请您填写下方配置以完成对报警邮件的设定，如果您不清楚以下内容该如何填写，请咨询您的公司技术人员以获得详细信息或者联系hi@threathunter.cn以获得帮助。';
    } else if (selectIndex === 1) {
      describe = '通过对网络流量过滤的配置，您可以过滤一些不需要分析的流量，如内部的IT健康检查请求或者来自合作伙伴的访问，这些流量往往量比较大而且是安全的，可能会对您的分析工作造成干扰，请您填写下方配置以完成对网络流量过滤的设定，如果您不清楚以下内容该如何填写，请咨询您公司的技术人员以获得详细信息或者联系hi@threathunter.cn以获得帮助。';
    } else if (selectIndex === 2) {
      describe = '通过对日志显示管理的配置，您可以过滤一些量较大但对分析没有帮助的请求，如图片资源访问的请求，这些被过滤的日志不会再显示，但仍然会参与计算，请您填写下方配置以完成对日志显示管理的设定，如果您不清楚以下内容该如何填写，请咨询您公司的技术人员以获得详细信息或者联系hi@threathunter.cn以获得帮助。';
    } else if (selectIndex === 3) {
      describe = '通过对敏感字段加密的配置，您可以将一些敏感信息在内存中加密，在您查询分析的时候，这些敏感信息只会显示加密摘要，请您填写下方配置以完成对日志显示管理的设定，如果您不清楚以下内容该如何填写，请咨询您公司的技术人员以获得详细信息或者联系hi@threathunter.cn以获得帮助。';
    }

    this.setState({
      describe,
      selectIndex
    });
  }

  render() {
    // 获取配置页面
    const config = this.getConfigContent();

    return (
      <div className="system-config container">
        <TabBar
          tabList={this.state.settingTabs}
          selectIndex={this.state.selectIndex}
          onSelect={(e, item) => {
            this.selectTab(item);
          }}
        />

        <div className="config-container">
          <div className="config-describe">
            <h2 className="describe-title">说明</h2>

            <p className="describe-content">{this.state.describe}</p>
          </div>
          <div className="config-content">
            {config}
          </div>
        </div>
      </div>
    );
  }
}

export default SystemConfig;
