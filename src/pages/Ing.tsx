import {ParamListBase} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Pressable, Text, View} from 'react-native';

type DeliveryScreenProps = NativeStackScreenProps<ParamListBase, 'Ing'>;

export default function Ing({navigation}: DeliveryScreenProps) {
  return (
    <View>
      <Pressable
        onPress={() => {
          navigation.navigate('Complete');
        }}>
        <Text>지도</Text>
      </Pressable>
    </View>
  );
}
