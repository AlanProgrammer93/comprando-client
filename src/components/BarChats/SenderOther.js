import React from 'react';

const SenderOther = ({ msg }) => {
  return <div className="sender-other">
    <div className="user-avatar">
      <div className="img-container">
        <img src="https://source.unsplash.com/random/35x35" />
      </div>
      <div className="other-message">
        {msg}
      </div>
    </div>
  </div>;
};

export default SenderOther;
