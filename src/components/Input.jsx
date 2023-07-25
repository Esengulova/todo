import React from 'react';
export const Input = ({ value, onChange, ...rest }) => {
  return <input type="text" value={value} onChange={onChange} />;
};