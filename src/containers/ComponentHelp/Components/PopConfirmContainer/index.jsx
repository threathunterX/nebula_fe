import React from 'react';
import PopConfirm from '../../../../components/PopConfirm';

function PopConfirmContainer() {
  return (
    <div className="component-container">
      <h2>PopConfirm 弹出确认框组件</h2>

      <div className="component-part">
        <div className="component-card">

          <div className="demo-container">

            <PopConfirm
              placement="top"
              overlay="确认提示"
              onConfirm={(e, res) => (res ? console.log('confirm') : console.log('cancel'))}
            >
              <button className="main-btn middle-btn">按钮</button>
            </PopConfirm>

          </div>
          <div className="demo-describe">
            <div className="demo-title">基本</div>
            最简单的用法。
          </div>
          <div className="demo-code">
            {'import PopConfirm from "../../../../components/PopConfirm";'} <br />

            {'<PopConfirm placement="top" overlay="确认提示"'} <br />
            &emsp;&emsp;&emsp;&emsp;{'onConfirm={(e,res)=>{res?console.log("confirm"):console.log("cancel")}}>'}
            <br />
            &emsp;{'<button className="main-btn middle-btn">按钮</button>'} <br />
            {'</PopConfirm>'} <br />
            <br />
          </div>
        </div>

        <div className="component-card">

          <div className="demo-container">

            <PopConfirm
              trigger="hover"
              placement="top"
              overlay="确认提示"
              onConfirm={(e, res) => (res ? console.log('confirm') : console.log('cancel'))}
            >
              <button className="main-btn middle-btn">按钮</button>
            </PopConfirm>
          </div>

          <div className="demo-describe">
            <div className="demo-title">触发方法</div>
            <span className="key-word">trigger</span>属性可以设置触发类型，不设置默认为click。
          </div>

          <div className="demo-code">
            {'import PopConfirm from "../../../../components/PopConfirm";'} <br />

            {'<PopConfirm trigger="hover" placement="top" overlay="确认提示"'} <br />
            &emsp;&emsp;&emsp;&emsp;{'onConfirm={(e,res)=>{res?console.log("confirm"):console.log("cancel")}}>'}
            <br />
            &emsp;{'<button className="main-btn middle-btn">按钮</button>'} <br />
            {'</PopConfirm>'} <br />
            <br />
          </div>

        </div>

        <div className="component-card">

          <div className="demo-container">

            <PopConfirm
              placement="top"
              overlay="确认提示"
              okText="ok"
              cancelText="cancel"
              onConfirm={(e, res) => (res ? console.log('confirm') : console.log('cancel'))}
            >
              <button className="main-btn middle-btn">按钮</button>
            </PopConfirm>

          </div>

          <div className="demo-describe">
            <div className="demo-title">按钮文字</div>
            <span className="key-word">okText</span>和<span className="key-word">cancelText</span>属性可以确认取消按钮的文字，不设置默认为“确认”和“取消”。
          </div>

          <div className="demo-code">
            {'import PopConfirm from "../../../../components/PopConfirm";'} <br />

            {'<PopConfirm placement="top" overlay="确认提示" okText="ok" cancelText="cancel"'} <br />
            &emsp;&emsp;&emsp;&emsp;{'onConfirm={(e,res)=>{res?console.log("confirm"):console.log("cancel")}}>'}
            <br />
            &emsp;{'<button className="main-btn middle-btn">按钮</button>'} <br />
            {'</PopConfirm>'} <br />
            <br />

          </div>

        </div>

      </div>


      <div className="component-part">

        <div className="component-card">

          <div className="demo-container">

            <div className="demo-easy-toast">
              <PopConfirm placement="topLeft" overlay={'确认提示'}>
                <span style={{ marginRight: '20px' }}>上左确认提示。</span>
              </PopConfirm>
              <PopConfirm placement="top" overlay={'确认提示'}>
                <span style={{ marginRight: '20px' }}>上方确认提示。</span>
              </PopConfirm>
              <PopConfirm placement="topRight" overlay={'确认提示'}>
                <span>上右确认提示。</span>
              </PopConfirm>
            </div>

            <div className="demo-easy-toast">
              <PopConfirm placement="leftTop" overlay={'确认提示'}>
                <span>左上确认提示。</span>
              </PopConfirm>
              <PopConfirm placement="rightTop" overlay={'确认提示'}>
                <span style={{ float: 'right' }}>右上确认提示。</span>
              </PopConfirm>
            </div>
            <div className="demo-easy-toast">
              <PopConfirm placement="left" overlay={'确认提示'}>
                <span>左边确认提示。</span>
              </PopConfirm>
              <PopConfirm placement="right" overlay={'确认提示'}>
                <span style={{ float: 'right' }}>右边确认提示。</span>
              </PopConfirm>
            </div>
            <div className="demo-easy-toast">
              <PopConfirm placement="leftBottom" overlay={'确认提示'}>
                <span>左下确认提示。</span>
              </PopConfirm>
              <PopConfirm placement="rightBottom" overlay={'确认提示'}>
                <span style={{ float: 'right' }}>右下确认提示。</span>
              </PopConfirm>
            </div>

            <div className="demo-easy-toast">
              <PopConfirm placement="bottomLeft" overlay={'确认提示'}>
                <span style={{ marginRight: '20px' }}>下左确认提示。</span>
              </PopConfirm>
              <PopConfirm placement="bottom" overlay={'确认提示'}>
                <span style={{ marginRight: '20px' }}>下方确认提示。</span>
              </PopConfirm>
              <PopConfirm placement="bottomRight" overlay={'确认提示'}>
                <span>下右确认提示。</span>
              </PopConfirm>
            </div>
          </div>
          <div className="demo-describe">
            <div className="demo-title">位置</div>
            确认提示有 12 个方向，使用<span className="key-word">placement</span>属性设置。
          </div>
          <div className="demo-code">
            {'import PopConfirm from "../../../../components/PopConfirm";'} <br />
            {'<div className="demo-easy-toast">'} <br />
            &emsp;{'<PopConfirm placement="topLeft" overlay={"确认提示"}>'} <br />
            &emsp;&emsp;{'<span>左上确认提示。</span>'} <br />
            &emsp;{'</PopConfirm>'}<br />
            &emsp;{'<PopConfirm placement="top" overlay={"确认提示"}>'}<br />
            &emsp;&emsp;{'<span style={{"marginRight": "20px"}}>上方确认提示。</span>'} <br />
            &emsp;{'</PopConfirm>'}<br />
            &emsp;{'<PopConfirm placement="topRight" overlay={"确认提示"}>'}<br />
            &emsp;&emsp;{'<span>上右确认提示。</span>'} <br />
            &emsp;{'</PopConfirm>'}<br />
            {'</div>'} <br />

            {'<div className="demo-easy-toast">'} <br />
            &emsp;{'<PopConfirm placement="leftTop" overlay={"确认提示"}>'} <br />
            &emsp;&emsp;{'<span>左上确认提示。</span>'} <br />
            &emsp;{'</PopConfirm>'}<br />
            &emsp;{'<PopConfirm placement="rightTop" overlay={"确认提示"}>'}<br />
            &emsp;&emsp;{'<span style={{float: "right"}}>右上确认提示。</span>'} <br />
            &emsp;{'</PopConfirm>'}<br />
            {'</div>'} <br />
            {'<div className="demo-easy-toast">'} <br />
            &emsp;{'<PopConfirm placement="left" overlay={"确认提示"}>'} <br />
            &emsp;&emsp;{'<span>左边确认提示。</span>'} <br />
            &emsp;{'</PopConfirm>'}<br />
            &emsp;{'<PopConfirm placement="right" overlay={"确认提示"}>'}<br />
            &emsp;&emsp;{'<span style={{float: "right"}}>右边确认提示。</span>'} <br />
            &emsp;{'</PopConfirm>'}<br />
            {'</div>'} <br />
            {'<div className="demo-easy-toast">'} <br />
            &emsp;{'<PopConfirm placement="leftBottom" overlay={"确认提示"}>'} <br />
            &emsp;&emsp;{'<span>左下确认提示。</span>'} <br />
            &emsp;{'</PopConfirm>'}<br />
            &emsp;{'<PopConfirm placement="rightBottom" overlay={"确认提示"}>'}<br />
            &emsp;&emsp;{'<span style={{float: "right"}}>右下确认提示。</span>'} <br />
            &emsp;{'</PopConfirm>'}<br />
            {'</div>'} <br />

            {'<div className="demo-easy-toast">'} <br />
            &emsp;{'<PopConfirm placement="bottomLeft" overlay={"确认提示"}>'} <br />
            &emsp;&emsp;{'<span style={{"marginRight": "20px"}}>下左确认提示。</span>'} <br />
            &emsp;{'</PopConfirm>'}<br />
            &emsp;{'<PopConfirm placement="bottom" overlay={"确认提示"}>'}<br />
            &emsp;&emsp;{'<span style={{"marginRight": "20px"}}>下方确认提示。</span>'} <br />
            &emsp;{'</PopConfirm>'}<br />
            &emsp;{'<PopConfirm placement="bottomRight" overlay={"确认提示"}>'}<br />
            &emsp;&emsp;{'<span>下右确认提示。</span>'} <br />
            &emsp;{'</PopConfirm>'}<br />
            {'</div>'} <br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopConfirmContainer;
