import React from 'react';
import {Appbar, useTheme} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function HeaderScreenAddOrEdit({
  leftTitle,
  leftOnPress,
  rightTitle,
  rightOnPress,
}: {
  leftTitle: string;
  leftOnPress: () => void;
  rightTitle: string;
  rightOnPress: () => void;
}) {
  const {top} = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <Appbar
      elevated
      mode="center-aligned"
      style={{
        height: 45 + top,
        paddingTop: top,
        backgroundColor: theme.colors.primary,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
      }}>
      <Appbar.Content
        title={leftTitle}
        color={theme.colors.onPrimary}
        onPress={leftOnPress}
        style={{
          left: -80,
        }}
      />
      <Appbar.Content
        title={rightTitle}
        color={theme.colors.onPrimary}
        onPress={rightOnPress}
        style={{
          right: -80,
        }}
      />
    </Appbar>
  );
}
