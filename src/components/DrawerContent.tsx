import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const renderIconList = ({color, size}: {color: string; size: number}) => (
  <Icon name="format-list-checks" size={size} color={color} />
);
const renderIconCart = ({color, size}: {color: string; size: number}) => (
  <Icon name="cart-outline" size={size} color={color} />
);
const renderIconSettings = ({color, size}: {color: string; size: number}) => (
  <Icon name="format-paint" size={size} color={color} />
);

export default function DrawerContent(props: DrawerContentComponentProps) {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <DrawerContentScrollView
      {...props}
      style={{backgroundColor: theme.colors.primary}}>
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
        icon={renderIconSettings}
        activeTintColor={theme.colors.onPrimary}
        activeBackgroundColor={theme.colors.secondary}
        inactiveTintColor={theme.colors.onPrimary}
        label={'Colors'}
        onPress={() => navigation.navigate('colors' as never)}
        focused={props.state.routeNames[props.state.index] === 'colors'}
      />
    </DrawerContentScrollView>
  );
}
