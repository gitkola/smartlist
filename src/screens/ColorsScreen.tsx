import React from 'react';
import {HStack, VStack} from '@react-native-material/core';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Appbar, useTheme} from 'react-native-paper';
import {Platform, StatusBar, TouchableOpacity, View} from 'react-native';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import useSettingsTheme from '../store/settingsStore';
import {ScrollView} from 'react-native-gesture-handler';

const colorSchemas = [
  {
    id: 0,
    primary: '#6527BE',
    secondary: '#9681EB',
    background: '#DDDDDD',
    surface: '#FFFFFF',
  },
  {
    id: 1,
    primary: '#6527BE',
    secondary: '#45CFDD',
    background: '#DDDDDD',
    surface: '#FFFFFF',
  },
  {
    id: 2,
    primary: '#6527BE',
    secondary: '#9681EB',
    background: '#A7EDE7',
    surface: '#45CFDD',
  },
  {
    id: 3,
    primary: '#793FDF',
    secondary: '#7091F5',
    background: '#97FFF4',
    surface: '#FFFD8C',
  },
  {
    id: 4,
    primary: '#313866',
    secondary: '#504099',
    background: '#974EC3',
    surface: '#FE7BE5',
  },
  {
    id: 5,
    primary: '#191D88',
    secondary: '#1450A3',
    background: '#337CCF',
    surface: '#FFC436',
  },
  {
    id: 6,
    primary: '#FF9B9B',
    secondary: '#FFD6A5',
    background: '#FFFEC4',
    surface: '#CBFFA9',
  },
  {
    id: 7,
    primary: '#0C356A',
    secondary: '#279EFF',
    background: '#40F8FF',
    surface: '#D5FFD0',
  },
  {
    id: 8,
    primary: '#DFD7BF',
    secondary: '#3F2305',
    background: '#F5F5F5',
    surface: '#F2EAD3',
  },
  {
    id: 9,
    primary: '#A4D0A4',
    secondary: '#A4907C',
    background: '#98EECC',
    surface: '#D0F5BE',
  },
  {
    id: 10,
    primary: '#A4907C',
    secondary: '#617A55',
    background: '#FFF8D6',
    surface: '#F7E1AE',
  },
  {
    id: 11,
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
  const squareSize = 50;

  return (
    <VStack fill style={{backgroundColor: theme.colors.background}}>
      <StatusBar barStyle={'light-content'} />
      <ScrollView
        contentContainerStyle={{
          paddingTop: Platform.OS === 'ios' ? 90 : 60,
        }}>
        <VStack>
          {colorSchemas.map(schema => (
            <HStack m={32} justify="center" key={schema.id}>
              <TouchableOpacity
                onPress={() => {
                  settingsTheme.setTheme(schema);
                }}>
                <HStack
                  p={8}
                  bg={'#CCC'}
                  style={{
                    borderRadius: 16,
                    borderWidth: settingsTheme.colors.id === schema.id ? 5 : 5,
                    borderColor:
                      settingsTheme.colors.id === schema.id
                        ? '#FFF'
                        : 'rgba(0,0,0,0.1)',
                  }}>
                  <View
                    style={{
                      height: squareSize,
                      width: squareSize,
                      backgroundColor: schema.primary,
                      borderTopLeftRadius: 8,
                      borderBottomLeftRadius: 8,
                    }}
                  />
                  <View
                    style={{
                      height: squareSize,
                      width: squareSize,
                      backgroundColor: schema.secondary,
                    }}
                  />
                  <View
                    style={{
                      height: squareSize,
                      width: squareSize,
                      backgroundColor: schema.background,
                    }}
                  />
                  <View
                    style={{
                      height: squareSize,
                      width: squareSize,
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
      <Appbar
        elevated
        safeAreaInsets={{top}}
        style={{
          height: Platform.OS === 'ios' ? 90 : 60,
          backgroundColor: theme.colors.primary,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
        }}>
        <Appbar.Action
          icon={'menu'}
          iconColor={theme.colors.onPrimary}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        />
        <Appbar.Content title={'Colors'} color={theme.colors.onPrimary} />
      </Appbar>
    </VStack>
  );
}
