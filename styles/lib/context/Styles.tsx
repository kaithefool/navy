import React, { ReactNode } from 'react'
import StylesProvider from './StylesProvider'
import StylesNavTheme from './StylesNavTheme'
import StylesStyled from './StylesStyled'

const Styles = ({ children }: { children: ReactNode }) => {
  return (
    <StylesProvider>
      <StylesNavTheme>
        {children}
      </StylesNavTheme>
    </StylesProvider>
  )
}

Styles.NavTheme = StylesNavTheme
Styles.Styled = StylesStyled

export default Styles
