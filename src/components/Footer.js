import React from 'react';

const footerStyle = {
  position: 'fixed',
  bottom: 0,
  width: '100%',
  color: 'white', // Change the text color as needed
  textAlign: 'center',
  padding: '10px 0',
};

function Footer() {
  return (
    <footer style={footerStyle}>&copy; 2023 Toguz World</footer>
  );
}

export default Footer;
