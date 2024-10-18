import React, { ReactNode, useState, isValidElement } from 'react';
import { Pressable } from 'react-native';
import { useStyles } from '../../styles';
import Text from './Text';

const Btn = ({
  children,
  disabled = false,
  ...props
}: {
  children: ReactNode;
  disabled?: boolean;
}) => {
  const { sty } = useStyles();
  const [pressed, setPressed] = useState<boolean>(false);

  return (
    <Pressable
      style={sty`bg-secondary p-2 px-3 rounded-3`}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      {...props}
    >
      {isValidElement(children) ? children : (
        <Text>{children}</Text>
      )}
    </Pressable>
  );
};

export default Btn;