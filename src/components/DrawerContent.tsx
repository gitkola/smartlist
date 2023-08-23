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

export default function DrawerContent(props: DrawerContentComponentProps) {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <DrawerContentScrollView
      {...props}
      style={{backgroundColor: theme.colors.background}}>
      <DrawerItem
        icon={renderIconList}
        activeTintColor={theme.colors.primary}
        activeBackgroundColor={theme.colors.primaryContainer}
        inactiveTintColor={theme.colors.secondary}
        label={'ToDo'}
        onPress={() => navigation.navigate('todostack' as never)}
        focused={props.state.routeNames[props.state.index] === 'todostack'}
      />
      <DrawerItem
        icon={renderIconCart}
        activeTintColor={theme.colors.primary}
        activeBackgroundColor={theme.colors.primaryContainer}
        inactiveTintColor={theme.colors.secondary}
        label={'ToBuy'}
        onPress={() => navigation.navigate('tobuystack' as never)}
        focused={props.state.routeNames[props.state.index] === 'tobuystack'}
      />
    </DrawerContentScrollView>
  );
}
