import React, { ReactNode } from 'react';
import StylesContext from './StylesContext';

const StylesProvider = ({ children }: {
  children: ReactNode | (() => ReactNode);
}) => {
  const value = {};

  return (
    <StylesContext.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </StylesContext.Provider>
  );
};

export default StylesProvider;