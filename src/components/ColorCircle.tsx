import React from 'react';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useTheme} from 'react-native-paper';

export default function ColorCircle({
  onPress = () => {},
  color,
}: {
  onPress?: () => void;
  color: string;
}) {
  const theme = useTheme();
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: 24,
          backgroundColor:
            color === 'transparent' ? theme.colors.surface : color,
          borderWidth: 2,
          borderColor: theme.colors.secondary,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
    </TouchableOpacity>
  );
}
