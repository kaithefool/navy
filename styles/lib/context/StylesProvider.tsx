import React, { ReactNode, useState } from 'react';
import { useColorScheme } from 'react-native';
import StylesContext, { StylesContextType } from './StylesContext';
import { styWithTheme } from './helpers';
import { ThemeName, themeNames, themes } from '../../config';

const StylesProvider = ({ children }: {
  children: ReactNode | ((value: StylesContextType) => ReactNode);
}) => {
  const deviceConfig = useColorScheme();
  const [userConfig, setUserConfig] = useState<ThemeName | null>(null);
  const theme = themes[
    userConfig ?? deviceConfig ?? themeNames[0]
  ];

  const value: StylesContextType = {
    themes,
    theme,
    setTheme: setUserConfig,
    sty: theme
      ? styWithTheme(theme)
      : () => ({}),
  };

  return (
    <StylesContext.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </StylesContext.Provider>
  );
};

export default StylesProvider;