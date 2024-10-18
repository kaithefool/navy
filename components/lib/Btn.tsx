import React, { ReactNode } from 'react';
import { Pressable } from 'react-native';

const Btn = ({ children }: {
  children: ReactNode;
}) => {
  return (
    <Pressable>
      {children}
    </Pressable>
  );
};

export default Btn;