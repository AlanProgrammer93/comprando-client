import React from 'react';

const SenderMe = ({ msg }) => {
  return <div className="sender-me">
    <div className="my-message">
      {msg}
    </div>
    <div className="seen-at">
      <img className="check" src="/images/check.svg" /> Seen 8:00 AM
    </div>
  </div>;
};

export default SenderMe;
