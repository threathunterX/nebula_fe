import React, { Component } from 'react';
import Toast from '../../../../components/Toast';

class ToastContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      confirmVisible: false
    };
  }

  render() {
    const {
      visible,
      confirmVisible
    } = this.state;

    return (
      <div className="component-container">
        <h2>Toast 悬浮提示组件</h2>

        <div className="component-part">
          <div className="component-card">

            <div className="demo-container">

              <button
                className="main-btn large-btn"
                onClick={() => {
                  this.setState({ visible: true });
                }}
              >显示悬浮提示
              </button>

              <Toast
                visible={visible}
                onClose={() => {
                  this.setState({ visible: false });
                }}
                duration={3000}
              >
                悬浮提示内容
              </Toast>
            </div>
            <div className="demo-describe">
              <div className="demo-title">基本</div>
              最简单的用法。<span className="key-word">duration</span>不设置默认为4500。
            </div>
            <div className="demo-code">
              {'import Toast from "../../../../components/Toast";'} <br />
              {'let {visible}=this.state;'} <br />
              {'<button className="main-btn large-btn" onClick={('}
              {')=>this.setState({visible:true})}>显示悬浮提示</button>'}
              <br />
              {'<Toast visible={visible} onClose={('}
              {')=>this.setState({visible: false})} duration={3000}>'}
              <br />
              &emsp;悬浮提示内容 <br />
              {'</Toast>'}<br />
            </div>
          </div>

        </div>


        <div className="component-part">

          <div className="component-card">

            <div className="demo-container">

              <button
                className="main-btn large-btn"
                onClick={() => {
                  this.setState({ confirmVisible: true });
                }}
              >显示悬浮确认框
              </button>

              <Toast
                visible={confirmVisible}
                type="confirm"
                onClose={() => {
                  this.setState({ confirmVisible: false });
                }}
                onConfirm={(res) => {
                  if (res) {
                    console.log('确定');
                  } else {
                    console.log('取消');
                  }
                  this.setState({ confirmVisible: false });
                }}
                title="title"
                duration={0}
              >
                显示悬浮确认框内容
              </Toast>

            </div>
            <div className="demo-describe">
              <div className="demo-title">悬浮确认框</div>
              供确认取消按钮给用户使用
            </div>
            <div className="demo-code">

              {'import Toast from "../../../../components/Toast";'} <br />
              {'let {confirmVisible}=this.state;'} <br />
              {'<button className="main-btn large-btn" onClick={('}
              {')=>{this.setState({confirmVisible:true})}}>显示悬浮确认框</button>'}
              <br />
              {'<Toast visible={confirmVisible} type="confirm" onClose={('}
              {')=>{this.setState({confirmVisible: false})}}'}
              <br />
              &emsp;&emsp;&emsp;&emsp;{'onConfirm={(res)=>{res?console.log("确定"):console.log("取消");this.setState({confirmVisible:false})}} title="title" duration={0}>'}
              <br />
              &emsp;显示悬浮确认框内容 <br />
              {'</Toast>'}<br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ToastContainer;
