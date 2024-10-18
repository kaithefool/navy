import React from 'react';
import { Text as NativeText } from 'react-native';
import Styles from '../../styles';

const Text = ({ ...props }) => {
  return (
    <Styles.Styled
      component={NativeText}
      defaultSty="text"
      {...props}
    />
  );
};

export default Text;