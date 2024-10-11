import React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { useStyles } from '../styles';

const FormLogin = () => {
  const { sty } = useStyles();

  return (
    <View style={sty`
      row align-items-center justify-content-center h-100
    `}>
      <View>
        <TextInput style={sty`border-1 rounded-2 ${{ height: 25 }}`} />
        <Text style={sty`h1 text-center`}>
          Login
        </Text>
      </View>
    </View>
  );
};

export default FormLogin;