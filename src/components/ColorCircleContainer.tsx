import React from 'react';
import {View} from 'react-native';

export default function ColorCircleContainer({
  children,
  w = 50,
  h = 50,
  ml,
  mr,
}: {
  children: React.ReactNode;
  w?: number;
  h?: number;
  ml?: number;
  mr?: number;
}) {
  return (
    <View
      style={{
        width: w,
        height: h,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: ml,
        marginRight: mr,
      }}>
      {children}
    </View>
  );
}
