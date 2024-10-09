import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useStyles } from '../styles';

const FormLogin = () => {
  const { sty } = useStyles();

  return (
    <View>
      <Text style={sty`h1 text-center`}>
        Login
      </Text>
      <Pressable>
      </Pressable>
    </View>
  );
};

export default FormLogin;