import React from 'react';

import './index.scss';

const avatar = require('../../resources/imgs/avatar.png');

function Avatar() {
  return <img className="avatar" src={avatar} alt="avatar" />;
}

export default Avatar;
