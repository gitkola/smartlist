import React from 'react';
import {HStack, VStack} from '@react-native-material/core';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Appbar, useTheme} from 'react-native-paper';
import {StatusBar, StyleSheet, TouchableOpacity, View} from 'react-native';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import useSettingsTheme from '../store/settingsStore';
import {ScrollView} from 'react-native-gesture-handler';

const colorSchemas = [
  {
    primary: '#6527BE',
    secondary: '#9681EB',
    background: '#DDDDDD',
    surface: '#FFFFFF',
  },
  {
    primary: '#6527BE',
    secondary: '#45CFDD',
    background: '#DDDDDD',
    surface: '#FFFFFF',
  },
  {
    primary: '#6527BE',
    secondary: '#9681EB',
    background: '#A7EDE7',
    surface: '#45CFDD',
  },
  {
    primary: '#793FDF',
    secondary: '#7091F5',
    background: '#97FFF4',
    surface: '#FFFD8C',
  },
  {
    primary: '#313866',
    secondary: '#504099',
    background: '#974EC3',
    surface: '#FE7BE5',
  },
  {
    primary: '#191D88',
    secondary: '#1450A3',
    background: '#337CCF',
    surface: '#FFC436',
  },
  {
    primary: '#FF9B9B',
    secondary: '#FFD6A5',
    background: '#FFFEC4',
    surface: '#CBFFA9',
  },
  {
    primary: '#0C356A',
    secondary: '#279EFF',
    background: '#40F8FF',
    surface: '#D5FFD0',
  },
  {
    primary: '#DFD7BF',
    secondary: '#3F2305',
    background: '#F5F5F5',
    surface: '#F2EAD3',
  },
  {
    primary: '#A4D0A4',
    secondary: '#A4907C',
    background: '#98EECC',
    surface: '#D0F5BE',
  },
  {
    primary: '#A4907C',
    secondary: '#617A55',
    background: '#FFF8D6',
    surface: '#F7E1AE',
  },
  {
    primary: '#A4D0A4',
    secondary: '#617A55',
    background: '#FFF8D6',
    surface: '#F7E1AE',
  },
];

export default function ColorsScreen() {
  const navigation = useNavigation();
  const {top} = useSafeAreaInsets();
  const theme = useTheme();
  const settingsTheme = useSettingsTheme();
  const squereSize = 50;

  return (
    <VStack fill style={{backgroundColor: theme.colors.background}}>
      <StatusBar barStyle={'light-content'} />
      <Appbar
        elevated
        safeAreaInsets={{top}}
        style={{
          height: 100,
          backgroundColor: theme.colors.primary,
        }}>
        <Appbar.Action
          icon={'menu'}
          iconColor={theme.colors.onPrimary}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        />
        <Appbar.Content title={'Settings'} color={theme.colors.onPrimary} />
      </Appbar>
      <ScrollView>
        <VStack>
          {colorSchemas.map(schema => (
            <HStack m={32} justify="center">
              <TouchableOpacity
                onPress={() => {
                  settingsTheme.setTheme(schema);
                }}>
                <HStack
                  p={8}
                  bg={'#ccc'}
                  style={{
                    borderRadius: 16,
                    borderWidth: StyleSheet.hairlineWidth,
                    borderColor: 'rgba(0,0,0,0.2)',
                  }}>
                  <View
                    style={{
                      height: squereSize,
                      width: squereSize,
                      backgroundColor: schema.primary,
                      borderTopLeftRadius: 8,
                      borderBottomLeftRadius: 8,
                    }}
                  />
                  <View
                    style={{
                      height: squereSize,
                      width: squereSize,
                      backgroundColor: schema.secondary,
                    }}
                  />
                  <View
                    style={{
                      height: squereSize,
                      width: squereSize,
                      backgroundColor: schema.background,
                    }}
                  />
                  <View
                    style={{
                      height: squereSize,
                      width: squereSize,
                      backgroundColor: schema.surface,
                      borderTopRightRadius: 8,
                      borderBottomRightRadius: 8,
                    }}
                  />
                </HStack>
              </TouchableOpacity>
            </HStack>
          ))}
        </VStack>
      </ScrollView>
    </VStack>
  );
}
