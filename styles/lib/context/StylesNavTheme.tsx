import React, { ReactNode } from 'react';
import { ThemeProvider } from '@react-navigation/native';
import useStyles from './useStyles';

const Styles = ({ children }: { children: ReactNode }) => {
  const { theme } = useStyles();

  return (
    <ThemeProvider value={theme.opts.nav}>
      {children}
    </ThemeProvider>
  );
};

export default Styles;