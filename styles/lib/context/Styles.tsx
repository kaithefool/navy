import React, { ReactNode } from 'react';
import StylesProvider from './StylesProvider';
import StylesNavTheme from './StylesNavTheme';

const Styles = ({ children }: { children: ReactNode }) => {

  return (
    <StylesProvider>
      <StylesNavTheme>
        {children}
      </StylesNavTheme>
    </StylesProvider>
  );
};

export default Styles;