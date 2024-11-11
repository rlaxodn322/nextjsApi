import React from 'react';
const footerstyle: React.CSSProperties = {
  display: 'flex',
  margin: '0 auto',
  width: '1200px',
  justifyContent: 'center',
};
const Footer: React.FC = () => {
  return (
    <>
      {
        <div style={footerstyle}>
          <div>taewoo</div>
        </div>
      }
    </>
  );
};

export default Footer;
