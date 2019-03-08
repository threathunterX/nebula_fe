import React from 'react';
import List from '../../../../components/List';

function ListContainer() {
  return (
    <div className="component-container">
      <h2>List 列表组件</h2>

      <div className="component-part">
        <div className="component-card">

          <div className="demo-container">

            <List text="List1" defaultFolded={false}>
              <List text="List2" defaultFolded={false}>
                <List text="List3" defaultFolded={false}>
                  <div>
                    <span style={{ marginRight: '10px' }}>text1</span>
                    <span>text2</span>
                  </div>
                </List>
              </List>
            </List>

          </div>
          <div className="demo-describe">
            <div className="demo-title">基本</div>
            最简单的用法。
          </div>
          <div className="demo-code">
            {'import List from "../../../../components/List";'} <br />

            {'<List text="List1" defaultFolded={false}>'} <br />
            &emsp;{'<List text="List2" defaultFolded={false}>'} <br />
            &emsp;&emsp;{'<List text="List3" defaultFolded={false}>'} <br />
            &emsp;&emsp;&emsp;{'<div>'} <br />
            &emsp;&emsp;&emsp;&emsp;{'<span style={{marginRight: "10px"}}>text1</span>'} <br />
            &emsp;&emsp;&emsp;&emsp;{'<span>text2</span>'} <br />
            &emsp;&emsp;&emsp;{'</div>'} <br />
            &emsp;&emsp;{'</List>'} <br />
            &emsp;{'</List>'} <br />
            {'</List>'} <br />
            <br />

          </div>
        </div>

      </div>


      <div className="component-part">

        <div className="component-card">

          <div className="demo-container">

            <List text="List1" defaultFolded={false}>
              <List text="List2" defaultFolded>
                <List text="List3" defaultFolded={false}>
                  <div>
                    <span style={{ marginRight: '10px' }}>text1</span>
                    <span>text2</span>
                  </div>
                </List>
              </List>
            </List>

          </div>
          <div className="demo-describe">
            <div className="demo-title">默认折叠</div>
            <span className="key-word">defaultFolded</span>属性为true时，该行列表默认折叠。
          </div>
          <div className="demo-code">
            {'import List from "../../../../components/List";'} <br />

            {'<List text="List1" defaultFolded={false}>'} <br />
            &emsp;{'<List text="List2" defaultFolded={true}>'} <br />
            &emsp;&emsp;{'<List text="List3" defaultFolded={false}>'} <br />
            &emsp;&emsp;&emsp;{'<div>'} <br />
            &emsp;&emsp;&emsp;&emsp;{'<span style={{marginRight: "10px"}}>text1</span>'} <br />
            &emsp;&emsp;&emsp;&emsp;{'<span>text2</span>'} <br />
            &emsp;&emsp;&emsp;{'</div>'} <br />
            &emsp;&emsp;{'</List>'} <br />
            &emsp;{'</List>'} <br />
            {'</List>'} <br />
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListContainer;
