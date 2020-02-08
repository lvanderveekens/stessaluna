import React from 'react';

const CustomToggle = React.forwardRef(function aap({ children, onClick }, ref) {
  return (
    <span
      ref={ref}
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
  </span>
  );
});

export default CustomToggle;