import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useStyles } from '../styles';

const FormLogin = () => {
  const { sty } = useStyles();

  // console.log(sty`text-primary ${{ display: 'flex' }}`);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={sty`text-primary ${{ display: 'flex' }}`}>Login</Text>
      <Pressable>
      </Pressable>
    </View>
  );
};

export default FormLogin;