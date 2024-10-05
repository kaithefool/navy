import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useStyles } from '../styles';

const FormLogin = () => {
  const { sty } = useStyles();

  return (
    <View>
      <Pressable>
        <Text style={sty`text-primary`}>Login</Text>
      </Pressable>
    </View>
  );
};

export default FormLogin;