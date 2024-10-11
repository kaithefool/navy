import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useStyles } from '../styles';

const FormLogin = () => {
  const { sty } = useStyles();

  return (
    <View style={sty`
      row align-items-center justify-content-center h-100
      bg-primary
    `}>
      <Text style={sty`h1 text-center text-body`}>
        Login
      </Text>
    </View>
  );
};

export default FormLogin;