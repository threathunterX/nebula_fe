import React from 'react';
import EasyToast from '../../../../components/EasyToast';

function EasyToastContainer() {
  return (
    <div className="component-container">
      <h2>EasyToast 悬浮提示组件</h2>

      <div className="component-part">
        <div className="component-card">

          <div className="demo-container">

            <EasyToast overlay="悬浮提示">
              <span>鼠标指向这里，显示悬浮提示。</span>
            </EasyToast>
          </div>
          <div className="demo-describe">
            <div className="demo-title">基本</div>
            最简单的用法。
          </div>
          <div className="demo-code">
            {'import EasyToast from "../../../../components/EasyToast";'} <br />
            {'<EasyToast overlay="悬浮提示">'} <br />
            &emsp;{'<span>鼠标指向这里，显示悬浮提示。</span>'} <br />
            {'</EasyToast>'}<br />
          </div>
        </div>


        <div className="component-card">

          <div className="demo-container">

            <EasyToast trigger="click" overlay="悬浮提示">
              <span>鼠标点击这里，显示悬浮提示。</span>
            </EasyToast>
          </div>
          <div className="demo-describe">
            <div className="demo-title">点击触发</div>
            点击后显示悬浮提示。
          </div>
          <div className="demo-code">
            {'import EasyToast from "../../../../components/EasyToast";'} <br />
            {'<EasyToast trigger="click" overlay="悬浮提示">'} <br />
            &emsp;{'<span>鼠标点击这里，显示悬浮提示。</span>'} <br />
            {'</EasyToast>'}<br />
          </div>
        </div>

      </div>


      <div className="component-part">

        <div className="component-card">

          <div className="demo-container">

            <div className="demo-easy-toast">
              <EasyToast placement="topLeft" overlay={'悬浮提示'}>
                <span style={{ marginRight: '20px' }}>上左悬浮提示。</span>
              </EasyToast>
              <EasyToast placement="top" overlay={'悬浮提示'}>
                <span style={{ marginRight: '20px' }}>上方悬浮提示。</span>
              </EasyToast>
              <EasyToast placement="topRight" overlay={'悬浮提示'}>
                <span>上右悬浮提示。</span>
              </EasyToast>
            </div>

            <div className="demo-easy-toast">
              <EasyToast placement="leftTop" overlay={'悬浮提示'}>
                <span>左上悬浮提示。</span>
              </EasyToast>
              <EasyToast placement="rightTop" overlay={'悬浮提示'}>
                <span style={{ float: 'right' }}>右上悬浮提示。</span>
              </EasyToast>
            </div>
            <div className="demo-easy-toast">
              <EasyToast placement="left" overlay={'悬浮提示'}>
                <span>左边悬浮提示。</span>
              </EasyToast>
              <EasyToast placement="right" overlay={'悬浮提示'}>
                <span style={{ float: 'right' }}>右边悬浮提示。</span>
              </EasyToast>
            </div>
            <div className="demo-easy-toast">
              <EasyToast placement="leftBottom" overlay={'悬浮提示'}>
                <span>左下悬浮提示。</span>
              </EasyToast>
              <EasyToast placement="rightBottom" overlay={'悬浮提示'}>
                <span style={{ float: 'right' }}>右下悬浮提示。</span>
              </EasyToast>
            </div>

            <div className="demo-easy-toast">
              <EasyToast placement="bottomLeft" overlay={'悬浮提示'}>
                <span style={{ marginRight: '20px' }}>下左悬浮提示。</span>
              </EasyToast>
              <EasyToast placement="bottom" overlay={'悬浮提示'}>
                <span style={{ marginRight: '20px' }}>下方悬浮提示。</span>
              </EasyToast>
              <EasyToast placement="bottomRight" overlay={'悬浮提示'}>
                <span>下右悬浮提示。</span>
              </EasyToast>
            </div>
          </div>
          <div className="demo-describe">
            <div className="demo-title">位置</div>
            悬浮提示有 12 个方向，使用<span className="key-word">placement</span>属性设置。
          </div>
          <div className="demo-code">
            {'import EasyToast from "../../../../components/EasyToast";'} <br />
            {'<div className="demo-easy-toast">'} <br />
            &emsp;{'<EasyToast placement="topLeft" overlay={"悬浮提示"}>'} <br />
            &emsp;&emsp;{'<span>左上悬浮提示。</span>'} <br />
            &emsp;{'</EasyToast>'}<br />
            &emsp;{'<EasyToast placement="top" overlay={"悬浮提示"}>'}<br />
            &emsp;&emsp;{'<span style={{"marginRight": "20px"}}>上方悬浮提示。</span>'} <br />
            &emsp;{'</EasyToast>'}<br />
            &emsp;{'<EasyToast placement="topRight" overlay={"悬浮提示"}>'}<br />
            &emsp;&emsp;{'<span>上右悬浮提示。</span>'} <br />
            &emsp;{'</EasyToast>'}<br />
            {'</div>'} <br />

            {'<div className="demo-easy-toast">'} <br />
            &emsp;{'<EasyToast placement="leftTop" overlay={"悬浮提示"}>'} <br />
            &emsp;&emsp;{'<span>左上悬浮提示。</span>'} <br />
            &emsp;{'</EasyToast>'}<br />
            &emsp;{'<EasyToast placement="rightTop" overlay={"悬浮提示"}>'}<br />
            &emsp;&emsp;{'<span style={{float: "right"}}>右上悬浮提示。</span>'} <br />
            &emsp;{'</EasyToast>'}<br />
            {'</div>'} <br />
            {'<div className="demo-easy-toast">'} <br />
            &emsp;{'<EasyToast placement="left" overlay={"悬浮提示"}>'} <br />
            &emsp;&emsp;{'<span>左边悬浮提示。</span>'} <br />
            &emsp;{'</EasyToast>'}<br />
            &emsp;{'<EasyToast placement="right" overlay={"悬浮提示"}>'}<br />
            &emsp;&emsp;{'<span style={{float: "right"}}>右边悬浮提示。</span>'} <br />
            &emsp;{'</EasyToast>'}<br />
            {'</div>'} <br />
            {'<div className="demo-easy-toast">'} <br />
            &emsp;{'<EasyToast placement="leftBottom" overlay={"悬浮提示"}>'} <br />
            &emsp;&emsp;{'<span>左下悬浮提示。</span>'} <br />
            &emsp;{'</EasyToast>'}<br />
            &emsp;{'<EasyToast placement="rightBottom" overlay={"悬浮提示"}>'}<br />
            &emsp;&emsp;{'<span style={{float: "right"}}>右下悬浮提示。</span>'} <br />
            &emsp;{'</EasyToast>'}<br />
            {'</div>'} <br />

            {'<div className="demo-easy-toast">'} <br />
            &emsp;{'<EasyToast placement="bottomLeft" overlay={"悬浮提示"}>'} <br />
            &emsp;&emsp;{'<span style={{"marginRight": "20px"}}>下左悬浮提示。</span>'} <br />
            &emsp;{'</EasyToast>'}<br />
            &emsp;{'<EasyToast placement="bottom" overlay={"悬浮提示"}>'}<br />
            &emsp;&emsp;{'<span style={{"marginRight": "20px"}}>下方悬浮提示。</span>'} <br />
            &emsp;{'</EasyToast>'}<br />
            &emsp;{'<EasyToast placement="bottomRight" overlay={"悬浮提示"}>'}<br />
            &emsp;&emsp;{'<span>下右悬浮提示。</span>'} <br />
            &emsp;{'</EasyToast>'}<br />
            {'</div>'} <br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EasyToastContainer;
