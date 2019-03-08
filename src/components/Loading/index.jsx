import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

const Loading = {

  // 显示loading
  showLoading(orgEle) {
    const ele = orgEle;
    let element;
    if (!ele) {
      element = document.querySelector('body');
    } else {
      element = document.querySelectorAll(ele);
    }
    [].forEach.call(element,(v, i)=>{
      const item = element[i];
      if (item.querySelector('.loading-mask')) {
        item.querySelector('.loading-mask').style.visibility = 'visible';
      } else {
        const e = document.createElement('div');
        e.className = 'loading-mask';
        ReactDOM.render(this.getLoadingIcon(), e);
        item.appendChild(e);
      }
    });
  },
  hideLoading(orgEle) {
    const ele = orgEle;
    let element;
    if (!ele) {
      element = document.querySelector('body');
    } else {
      element = document.querySelectorAll(ele);
    }
    // element.forEach((v, i) => {

    [].forEach.call(element,(v, i)=>{
      const item = element[i];
      if (item.querySelector('.loading-mask')) {
        item.querySelector('.loading-mask').style.visibility = 'hidden';
      }
    });
  },

  // 绘制loading图标
  getLoadingIcon() {
    return (
      <div className="loading-container">
        <div className="ball-spin-fade-loader">
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    );
  }
};
export default Loading;
