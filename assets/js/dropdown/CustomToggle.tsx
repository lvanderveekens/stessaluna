import React, { FC } from 'react';

interface Props {
  children: any,
  onClick?: Function
}

const CustomToggle = React.forwardRef(({ children, onClick }: Props, ref: React.Ref<HTMLSpanElement>) => {

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