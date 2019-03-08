import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import _ from 'lodash';
import BChart from 'BChart';

import Cardlist from './Cardlist';
import ChartsContainer from './ChartsContainer';
import CareManageDialog from './CareManageDialog';
import DeleteManageDialog from './DeleteManageDialog';

class CrawlerVisit extends Component {
  static propTypes = {
    cardDataList: PropTypes.oneOfType([PropTypes.array]).isRequired,
    followedList: PropTypes.oneOfType([PropTypes.array]).isRequired,
    deleteList: PropTypes.oneOfType([PropTypes.array]).isRequired,
    activePageType: PropTypes.string.isRequired,
    uri_stem: PropTypes.string.isRequired,
    current_day: PropTypes.number.isRequired,
    selectedIndex: PropTypes.number.isRequired,
    handleChange: PropTypes.func.isRequired,
    onSelectChange: PropTypes.func.isRequired,
    fetchVisitPagesData: PropTypes.func.isRequired,
    fetchFollowKeyword: PropTypes.func.isRequired,
    fetchDeleteData: PropTypes.func.isRequired,
    deleteKeywords: PropTypes.func.isRequired,
    updateKeywords: PropTypes.func.isRequired
    // uri_stem: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      careVisible: false,
      deleteVisible: false,
      addKeyWord: false
    };
  }

  shouldComponentUpdate(props, state) {
    return (
      JSON.stringify(this.props) !== JSON.stringify(props) ||
      JSON.stringify(this.state) !== JSON.stringify(state)
    );
  }

  handleChange(key, value) {
    this.setState({
      [key]: value
    });
  }

  render() {
    const {
      activePageType,
      handleChange,
      onSelectChange,
      fetchVisitPagesData,
      current_day,
      uri_stem,
      cardDataList,
      selectedIndex,
      fetchFollowKeyword,
      fetchDeleteData,
      followedList,
      deleteList,
      deleteKeywords,
      updateKeywords
    } = this.props;

    const {
      careVisible,
      deleteVisible,
      addKeyWord
    } = this.state;

    const {
      barChartData,
      delayData,
      uploadData,
      treeMapData
    } = (cardDataList[selectedIndex] || {});

    return (
      <div className="crawler-visit">
        <h2>
          爬虫访问页面
          <div className="care-delete-container">
            <button
              className="main-btn"
              onClick={() => {
                this.setState({ careVisible: true });
                fetchFollowKeyword({
                  is_followed: true,
                  is_ignored: false,
                  keyword_type: 'page'
                });
              }}
            >
              <i className="iconfont icon-star" />
            </button>
            <button
              className="main-btn"
              onClick={() => {
                this.setState({ deleteVisible: true });
                fetchDeleteData({
                  is_ignored: true,
                  keyword_type: 'page'
                });
              }}
            >
              <i className="iconfont icon-delete" />
            </button>
          </div>
        </h2>

        <div className="crawler-chart">
          <div className="tab-btn-container">
            <button
              className={`main-btn small-btn${activePageType === 'ALL' ? ' active' : ''}`}
              onClick={() => {
                handleChange('activePageType', 'ALL');
                handleChange('selectedIndex', 0);
                fetchVisitPagesData();
              }}
            >全部页面
            </button>
            <button
              className={`main-btn small-btn${activePageType === 'CARE' ? ' active' : ''}`}
              onClick={() => {
                handleChange('activePageType', 'CARE');
                handleChange('selectedIndex', 0);
                fetchVisitPagesData(true);
              }}
            >关注页面
            </button>
          </div>

          <Cardlist
            cardDataList={cardDataList}
            activePageType={activePageType}
            updateKeywords={updateKeywords}
            onSelect={index => onSelectChange(index)}
            selectedIndex={selectedIndex}
            fetchVisitPagesData={fetchVisitPagesData}
            handleChange={(key, value) => handleChange(key, value)}
          />

          {
            cardDataList.length > 0 ? (
              <ChartsContainer
                uri_stem={uri_stem}
                barChartData={barChartData}
                current_day={current_day}
                delayData={delayData}
                uploadData={uploadData}
                treeMapData={treeMapData}
              />
            ) : null
          }
        </div>

        <CareManageDialog
          careVisible={careVisible}
          cardDataList={followedList}
          addKeyWord={addKeyWord}
          deleteKeywords={deleteKeywords}
          updateKeywords={updateKeywords}
          fetchFollowKeyword={fetchFollowKeyword}
          handleChange={(key, value) => this.handleChange(key, value)}
        />

        <DeleteManageDialog
          deleteVisible={deleteVisible}
          deleteDataList={deleteList}
          updateKeywords={updateKeywords}
          fetchDeleteData={fetchDeleteData}
          handleChange={(key, value) => this.handleChange(key, value)}
        />
      </div>
    );
  }
}
export default CrawlerVisit;
