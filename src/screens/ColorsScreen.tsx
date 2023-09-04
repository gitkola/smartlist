import React from 'react';
import {HStack, VStack} from '@react-native-material/core';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  Checkbox,
  Divider,
  Appbar,
  FAB,
  useTheme,
  Text,
} from 'react-native-paper';
import {Platform, StatusBar, TouchableOpacity, View} from 'react-native';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useSettingsTheme from '../store/settingsStore';
import colorSchemas from '../utils/colorSchemas';

export default function ColorsScreen() {
  const navigation = useNavigation();
  const {top} = useSafeAreaInsets();
  const theme = useTheme();
  const settingsTheme = useSettingsTheme();

  return (
    <VStack fill style={{backgroundColor: theme.colors.background}}>
      {/* @ts-ignore */}
      <StatusBar barStyle={theme.colors.statusBarStyle} />
      <ScrollView
        contentContainerStyle={{
          paddingTop: Platform.OS === 'ios' ? 110 : 60,
        }}>
        <VStack>
          {colorSchemas.map(schema => (
            <HStack m={32} justify="center" key={schema.id}>
              <TouchableOpacity
                onPress={() => {
                  settingsTheme.setTheme(schema);
                }}>
                <HStack
                  p={settingsTheme.colors.id === schema.id ? 5 : 8}
                  style={{
                    backgroundColor: '#CCCCCC',
                    borderWidth: settingsTheme.colors.id === schema.id ? 4 : 1,
                    borderColor:
                      settingsTheme.colors.id === schema.id
                        ? schema.primary
                        : 'rgba(0,0,0,0.1)',
                    borderRadius: 32,
                    shadowColor: '#000000',
                    shadowOffset: {
                      width: 1,
                      height: 3,
                    },
                    shadowRadius: settingsTheme.colors.id === schema.id ? 1 : 8,
                    shadowOpacity: 0.5,
                    elevation: settingsTheme.colors.id === schema.id ? 8 : 16,
                  }}>
                  <VStack
                    bg={schema.primary}
                    pt={40}
                    style={{
                      borderTopLeftRadius: 24,
                      borderBottomLeftRadius: 24,
                    }}>
                    <HStack
                      spacing={8}
                      items="center"
                      style={{
                        marginHorizontal: 8,
                        paddingLeft: 8,
                        height: 40,
                        backgroundColor: schema.primary,
                        borderRadius: 4,
                      }}>
                      <Icon
                        name="format-list-checks"
                        size={20}
                        color={schema.onPrimary}
                      />
                      <Text
                        style={{
                          color: schema.onPrimary,
                          fontWeight: '500',
                        }}>
                        ToDo
                      </Text>
                    </HStack>
                    <HStack
                      spacing={8}
                      items="center"
                      style={{
                        marginHorizontal: 8,
                        paddingLeft: 8,
                        height: 40,
                        backgroundColor: schema.secondary,
                        borderRadius: 4,
                      }}>
                      <Icon
                        name="cart-outline"
                        size={20}
                        color={schema.onSecondary}
                      />
                      <Text
                        style={{
                          color: schema.onSecondary,
                          fontWeight: '500',
                          paddingRight: 8,
                        }}>
                        ToBuy
                      </Text>
                    </HStack>
                    <HStack
                      spacing={8}
                      items="center"
                      style={{
                        marginHorizontal: 8,
                        paddingLeft: 8,
                        height: 40,
                        backgroundColor: schema.primary,
                        borderRadius: 4,
                      }}>
                      <Icon
                        name="format-paint"
                        size={20}
                        color={schema.onPrimary}
                      />
                      <Text
                        style={{
                          color: schema.onPrimary,
                          fontWeight: '500',
                        }}>
                        Theme
                      </Text>
                    </HStack>
                  </VStack>
                  <VStack>
                    <HStack
                      items="center"
                      spacing={8}
                      style={{
                        width: 116,
                        height: 40,
                        paddingLeft: 8,
                        backgroundColor: schema.primary,
                        borderTopRightRadius: 24,
                      }}>
                      <Icon name="menu" size={20} color={schema.onPrimary} />
                      <Text
                        style={{
                          color: schema.onPrimary,
                          fontWeight: '500',
                          fontSize: 18,
                        }}>
                        ToBuy
                      </Text>
                    </HStack>
                    <HStack
                      items="center"
                      style={{
                        height: 40,
                        width: 116,
                        backgroundColor: schema.surface,
                      }}>
                      <Checkbox.Android
                        status={'unchecked'}
                        color={schema.secondary}
                        uncheckedColor={schema.secondary}
                        style={{
                          width: 16,
                          height: 16,
                        }}
                      />
                      <Text
                        style={{
                          color: schema.onSurface,
                          fontWeight: '500',
                        }}>
                        Apples
                      </Text>
                    </HStack>
                    <Divider />
                    <HStack
                      items="center"
                      style={{
                        height: 40,
                        width: 116,
                        backgroundColor: schema.surface,
                      }}>
                      <Checkbox.Android
                        status={'checked'}
                        color={schema.secondary}
                        uncheckedColor={schema.secondary}
                        style={{
                          width: 16,
                          height: 16,
                        }}
                      />
                      <Text
                        style={{
                          color: schema.onSurface,
                          fontWeight: '500',
                        }}>
                        Bananas
                      </Text>
                    </HStack>
                    <Divider />
                    <View
                      style={{
                        width: 116,
                        height: 80,
                        backgroundColor: schema.background,
                        borderBottomRightRadius: 24,
                      }}>
                      <FAB
                        size="small"
                        mode="elevated"
                        icon={'plus'}
                        color={schema.onSecondary}
                        style={{
                          position: 'absolute',
                          right: 8,
                          bottom: 8,
                          borderRadius: 60,
                          backgroundColor: schema.secondary,
                        }}
                      />
                    </View>
                  </VStack>
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
          height: Platform.OS === 'ios' ? 110 : 60,
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
        <Appbar.Content title={'Theme'} color={theme.colors.onPrimary} />
      </Appbar>
    </VStack>
  );
}
