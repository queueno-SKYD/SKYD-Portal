import React from 'react';
import ReactDOM from 'react-dom';
const PortalComponent = ({children}) => {
  return ReactDOM.createPortal(
    <div >
      {children}
    </div>,
    document.getElementById('portal-container') // Target container outside the root element
  );
};

export default PortalComponent;
