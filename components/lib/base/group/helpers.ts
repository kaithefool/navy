import { ViewStyle } from 'react-native'

export function getGroupItemStyle(
  parentStyle: ViewStyle,
  { first = false, last = false }: {
    first?: boolean
    last?: boolean
  } = {},
): ViewStyle {
  const {
    flexDirection = 'column',
    borderRadius = 0,
  } = parentStyle
  const p = [
    parentStyle.borderTopLeftRadius ?? borderRadius,
    parentStyle.borderTopRightRadius ?? borderRadius,
    parentStyle.borderBottomRightRadius ?? borderRadius,
    parentStyle.borderBottomLeftRadius ?? borderRadius,
  ]
  const r: typeof borderRadius[] = [0, 0, 0, 0]

  if (first) {
    switch (flexDirection) {
      case 'column':
        r[0] = p[0]
        r[1] = p[1]
        break
      case 'row':
        r[0] = p[0]
        r[3] = p[3]
        break
      case 'column-reverse':
        r[2] = p[2]
        r[3] = p[3]
        break
      case 'row-reverse':
        r[1] = p[1]
        r[2] = p[2]
        break
    }
  }
  if (last) {
    switch (flexDirection) {
      case 'column':
        r[2] = p[2]
        r[3] = p[3]
        break
      case 'row':
        r[1] = p[1]
        r[2] = p[2]
        break
      case 'column-reverse':
        r[0] = p[0]
        r[1] = p[1]
        break
      case 'row-reverse':
        r[0] = p[0]
        r[3] = p[3]
        break
    }
  }

  return {
    borderTopLeftRadius: r[0],
    borderTopRightRadius: r[1],
    borderBottomRightRadius: r[2],
    borderBottomLeftRadius: r[3],
  }
}
