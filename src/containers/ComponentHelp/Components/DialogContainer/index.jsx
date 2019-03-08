import React, { Component } from 'react';
import Dialog from '../../../../components/Dialog';
import DatePicker from '../../../../components/DatePicker';

class DialogContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      openIndex: 0,
      inputContent: ''
    };
  }

  render() {
    const {
      visible,
      inputContent,
      openIndex
    } = this.state;

    const buttons = [{
      text: '确定',
      onClick: () => {
        console.log('确定');
      }
    }, {
      text: '取消',
      cls: 'cancel-btn',
      onClick: () => {
        this.setState({ visible: false });
      }
    }];

    const buttons1 = [{
      text: '关闭',
      onClick: () => {
        this.setState({ visible: false });
      }
    }];

    return (
      <div className="component-container">
        <h2>Dialog 对话框组件</h2>

        <div className="component-part">
          <div className="component-card">

            <div className="demo-container">
              <button
                className="main-btn middle-btn"
                onClick={() => {
                  this.setState({ visible: true, openIndex: 0 });
                }}
              >显示对话框
              </button>

              <Dialog
                visible={openIndex === 0 && visible}
                title="标题"
                buttons={buttons}
                onClose={() => {
                  this.setState({ visible: false });
                }}
              >
                <div style={{ color: '#fff' }}>对话框内容</div>
              </Dialog>
            </div>
            <div className="demo-describe">
              <div className="demo-title">基本</div>
              最简单的用法，关闭对话框时不销毁对话框。
            </div>
            <div className="demo-code">
              {'import Dialog from "../../../../components/Dialog";'} <br />
              {'const {visible} = this.state;'} <br />
              {'const buttons = [{'} <br />
              {'text: "确定",'} <br />
              {'onClick: e=> {console.log("确定");}'} <br />
              {'}, {'} <br />
              {'text: "取消",'} <br />
              {'cls: "cancel-btn",'} <br />
              {'onClick: e=> {this.setState({visible: false})}'} <br />
              {'}];'} <br />
              {'<Dialog visible={visible} title="标题" buttons={buttons} onClose={('}
              {')=>{this.setState({visible: false})}}>'}
              <br />
              &emsp;{'<div style={{"color": "#fff"}}>对话框内容</div>'}<br />
              {'</Dialog>'}<br />
            </div>
          </div>

          <div className="component-card">

            <div className="demo-container">
              <button
                className="main-btn middle-btn"
                onClick={() => {
                  this.setState({ visible: true, openIndex: 3 });
                }}
              >显示对话框
              </button>

              <Dialog
                visible={openIndex === 3 && visible}
                className="component-dialog-class"
                style={{ height: '200px' }}
                title="标题"
                buttons={buttons1}
                onClose={() => {
                  this.setState({ visible: false });
                }}
              >
                <div style={{ color: '#fff' }}>对话框内容</div>
              </Dialog>
            </div>
            <div className="demo-describe">
              <div className="demo-title">对话框样式</div>
              使用<span className="key-word">className</span>和<span className="key-word">style</span>属性，可以自定义对话框样式。
            </div>
            <div className="demo-code">
              {'import Dialog from "../../../../components/Dialog";'} <br />
              {'const {visible} = this.state;'} <br />
              {'const buttons = [{'} <br />
              {'text: "关闭",'} <br />
              {'onClick: e=> {this.setState({visible: false})}'} <br />
              {'}];'} <br />
              {'<Dialog visible={visible} className="component-dialog-class" style={{height: "200px"}}'}<br />
              &emsp;&emsp;&emsp;&emsp;{'title="标题" buttons={buttons1} onClose={()=>{this.setState({visible: false})}}>'}<br />
              &emsp;{'<div style={{"color": "#fff"}}>对话框内容</div>'}<br />
              {'</Dialog>'}<br /><br />
              CSS文件:<br />
              .dialog-mask .component-dialog-class {'{'}<br />
              &emsp;{'width: 200px;'}<br />
              {'}'}<br />
            </div>
          </div>
        </div>


        <div className="component-part">
          <div className="component-card">

            <div className="demo-container">
              <button
                className="main-btn middle-btn"
                onClick={() => {
                  this.setState({ visible: true, openIndex: 1 });
                }}
              >显示对话框
              </button>

              <Dialog
                visible={openIndex === 1 && visible}
                destroy
                title="标题"
                buttons={buttons1}
                onClose={() => {
                  this.setState({ visible: false });
                }}
              >
                <div style={{ color: '#fff' }}>关闭时销毁对话框元素</div>
              </Dialog>
            </div>
            <div className="demo-describe">
              <div className="demo-title">销毁对话框</div>
              当<span className="key-word">destroy</span>属性为true时，关闭对话框时直接销毁对话框元素。
            </div>
            <div className="demo-code">
              {'import Dialog from "../../../../components/Dialog";'} <br />
              {'const {visible} = this.state;'} <br />
              {'const buttons = [{'} <br />
              {'text: "关闭",'} <br />
              {'onClick: e=> {this.setState({visible: false})}'} <br />
              {'}];'} <br />
              {'<Dialog visible={visible} destroy={true} title="标题" buttons={buttons} onClose={('}
              {')=>{this.setState({visible: false})}}>'}
              <br />
              &emsp;{'<div style={{"color": "#fff"}}>关闭时销毁对话框元素</div>'}<br />
              {'</Dialog>'}<br />
            </div>
          </div>


          <div className="component-card">

            <div className="demo-container">
              <button
                className="main-btn middle-btn"
                onClick={() => {
                  this.setState({ visible: true, openIndex: 2 });
                }}
              >显示对话框
              </button>

              <Dialog
                visible={openIndex === 2 && visible}
                destroy
                title="标题"
                buttons={buttons}
                onClose={() => {
                  this.setState({ visible: false });
                }}
              >
                <input
                  style={{ background: '#1B1F2A', marginBottom: '10px' }}
                  type="text"
                  placeholder="请输入内容"
                  onChange={(e) => {
                    this.setState({ inputContent: e.target.value });
                  }}
                /> <br />
                <DatePicker
                  style={{ background: '#1B1F2A', marginBottom: '10px' }}
                  placeholder="选择日期"
                  showTime={false}
                  defaultTime={new Date().getTime()}
                  onChange={value => console.log(value)}
                /> <br />
                <button
                  className="main-btn middle-btn"
                  onClick={() => {
                    console.log(inputContent);
                  }}
                >控制台打印
                </button>
              </Dialog>
            </div>
            <div className="demo-describe">
              <div className="demo-title">功能性对话框</div>
              对话框子元素中可添加任何元素用于满足各个业务，若关闭时需要记住内容，设置<span className="key-word">destroy</span>属性为false即可。
            </div>
            <div className="demo-code">
              {'import Dialog from "../../../../components/Dialog";'} <br />
              {'import DatePicker from "../../components/DatePicker";'} <br />
              {'const {visible} = this.state;'} <br />
              {'const buttons = [{'} <br />
              {'text: "确定",'} <br />
              {'onClick: e=> {console.log("确定");}'} <br />
              {'}, {'} <br />
              {'text: "取消",'} <br />
              {'cls: "cancel-btn",'} <br />
              {'onClick: e=> {this.setState({visible: false})}'} <br />
              {'}];'} <br />
              {'<Dialog visible={visible} destroy title="标题" buttons={buttons} onClose={('}
              {')=>{this.setState({visible: false})}}>'}
              <br />
              &emsp;{'<input style={{background: "#1B1F2A", marginBottom: "10px"}} type="text" placeholder="请输入内容"'}<br />
              &emsp;&emsp;&emsp;{'onChange={(e)=>{this.setState({inputContent:e.target.value})}}/> <br/>'}<br />
              &emsp;{'<DatePicker style={{background: "#1B1F2A", marginBottom: "10px"}} placeholder="选择日期" showTime={false}'}<br />
              &emsp;&emsp;&emsp;{'defaultTime={new Date().getTime()} onChange={value => console.log(value)}/> <br/>'}<br />
              &emsp;{'<button className="main-btn middle-btn" onClick={e=>{console.log(inputContent);}}>控制台打印</button>'}<br />
              {'</Dialog>'}<br />
            </div>
          </div>

        </div>

      </div>
    );
  }
}

export default DialogContainer;
