import React from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { useStyles } from '../styles';
import Text from './lib/Text';

const FormLogin = () => {
  const { sty } = useStyles();

  return (
    <View style={sty`
      row align-items-center justify-content-center h-100
    `}>
      <View>
        <TextInput style={sty`border-1 rounded-2 ${{ height: 25 }}`} />
        <Pressable style={sty`rounded-3 bg-primary px-3 p-2 my-2`}>
          <Text sty="text-body fw-bold">
            Login
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default FormLogin;