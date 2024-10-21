import { useContext } from 'react'
import StylesContext from './StylesContext'

export default function useStyles() {
  return useContext(StylesContext)
}
