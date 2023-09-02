import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {Button, Text, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {VStack} from '@react-native-material/core';
import {signOut} from 'firebase/auth';
import {useAuthentication} from '../hooks/useAuthentication';
import {auth} from '../config/firebase';

const renderIconList = ({color, size}: {color: string; size: number}) => (
  <Icon name="format-list-checks" size={size} color={color} />
);
const renderIconCart = ({color, size}: {color: string; size: number}) => (
  <Icon name="cart-outline" size={size} color={color} />
);
const renderIconCloudToDo = ({color, size}: {color: string; size: number}) => (
  <Icon name="cloud-print-outline" size={size} color={color} />
);
const renderIconSettings = ({color, size}: {color: string; size: number}) => (
  <Icon name="format-paint" size={size} color={color} />
);

export default function DrawerContent(props: DrawerContentComponentProps) {
  const {user} = useAuthentication();
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled={false}
      style={{backgroundColor: theme.colors.primary}}
      contentContainerStyle={{
        flex: 1,
      }}>
      <DrawerItem
        icon={renderIconList}
        activeTintColor={theme.colors.onPrimary}
        activeBackgroundColor={theme.colors.secondary}
        inactiveTintColor={theme.colors.onPrimary}
        label={'ToDo'}
        onPress={() => navigation.navigate('todostack' as never)}
        focused={props.state.routeNames[props.state.index] === 'todostack'}
      />
      <DrawerItem
        icon={renderIconCart}
        activeTintColor={theme.colors.onPrimary}
        activeBackgroundColor={theme.colors.secondary}
        inactiveTintColor={theme.colors.onPrimary}
        label={'ToBuy'}
        onPress={() => navigation.navigate('tobuystack' as never)}
        focused={props.state.routeNames[props.state.index] === 'tobuystack'}
      />
      <DrawerItem
        icon={renderIconCloudToDo}
        activeTintColor={theme.colors.onPrimary}
        activeBackgroundColor={theme.colors.secondary}
        inactiveTintColor={theme.colors.onPrimary}
        label={'Cloud ToDo'}
        onPress={() => navigation.navigate('cloudtodostack' as never)}
        focused={props.state.routeNames[props.state.index] === 'cloudtodostack'}
      />
      <DrawerItem
        icon={renderIconSettings}
        activeTintColor={theme.colors.onPrimary}
        activeBackgroundColor={theme.colors.secondary}
        inactiveTintColor={theme.colors.onPrimary}
        label={'Theme'}
        onPress={() => navigation.navigate('colors' as never)}
        focused={props.state.routeNames[props.state.index] === 'colors'}
      />
      {user && (
        <VStack
          ph={16}
          pv={32}
          spacing={16}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
          }}>
          <Text style={{color: theme.colors.onPrimary}}>
            You are logged in as{' '}
            <Text style={{color: theme.colors.onPrimary, fontWeight: '600'}}>
              {user?.email}
            </Text>
          </Text>
          <Button
            style={{width: 120}}
            icon={'logout'}
            buttonColor={theme.colors.secondary}
            textColor={theme.colors.onPrimary}
            onPress={() => signOut(auth)}>
            LOGOUT
          </Button>
        </VStack>
      )}
    </DrawerContentScrollView>
  );
}
