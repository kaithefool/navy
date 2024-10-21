import React, { ReactNode, useState, isValidElement } from 'react';
import { Pressable } from 'react-native';
import { useStyles } from '../../styles';
import Text from './Text';

const Btn = ({
  children,
  disabled = false,
  variant = 'filled',
  ...props
}: {
  children: ReactNode;
  disabled?: boolean;
  variant?: 'filled' | 'tonal' | 'outline';
}) => {
  const { sty } = useStyles();
  const [pressed, setPressed] = useState<boolean>(false);

  return (
    <Pressable
      style={sty`btn btn-outline-primary`}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      {...props}
    >
      {isValidElement(children) ? children : (
        <Text sty="btn-outline-primary:text">{children}</Text>
      )}
    </Pressable>
  );
};

export default Btn;