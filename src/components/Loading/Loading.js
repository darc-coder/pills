import React from 'react';
import './Loading.css';

const Loading = () => (
  <div className="loading">
    <div className="lds-ring">
      {/* Divs Used as rings */}
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);

Loading.defaultProps = {};

export default Loading;
