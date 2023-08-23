import React from 'react';
import {View} from 'react-native';

export default function ColorCircleContainer({
  children,
  w = 50,
  h = 50,
}: {
  children: React.ReactNode;
  w?: number;
  h?: number;
}) {
  return (
    <View
      style={{
        width: w,
        height: h,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {children}
    </View>
  );
}
