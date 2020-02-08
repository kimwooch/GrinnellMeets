import React from 'react';
import { Menu } from 'antd';

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item className="modified-item" key="mail">
        <a href="/">Home</a>
      </Menu.Item>
    </Menu>
  )
}

export default LeftMenu