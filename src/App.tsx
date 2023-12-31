import React, {useEffect} from 'react';
import './config/firebase';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PaperProvider, MD3LightTheme} from 'react-native-paper';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import Orientation from 'react-native-orientation-locker';
import DrawerContent from './components/DrawerContent';
import TodoScreen from './screens/TodoScreen';
import TobuyScreen from './screens/TobuyScreen';
import ModalAddTodo from './screens/AddTodoScreen';
import ModalEditTodo from './screens/EditTodoScreen';
import ModalAddTobuy from './screens/AddTobuyScreen';
import ModalEditTobuy from './screens/EditTobuyScreen';
import useSettingsTheme from './store/settingsStore';
import ColorsScreen from './screens/ColorsScreen';
import SplashScreen from 'react-native-splash-screen';
import SignInScreen from './screens/SignInScreen';
import {useAuthentication} from './hooks/useAuthentication';
import CloudTodoScreen from './screens/CloudTodoScreen';
import ModalEditCloudTodo from './screens/EditCloudTodoScreen';
import ModalAddCloudTodo from './screens/AddCloudTodoScreen';

type DrawerParamsList = {
  cloudtodostack: undefined;
  todostack: undefined;
  tobuystack: undefined;
  colors: undefined;
};

type TodoStackParamList = {
  todo: undefined;
  addTodo: undefined;
  editTodo: undefined;
};
export type TodoScreenProps = NativeStackScreenProps<
  TodoStackParamList,
  'todo'
>;

type TobuyStackParamList = {
  tobuy: undefined;
  addTobuy: undefined;
  editTobuy: undefined;
};
export type TobuyScreenProps = NativeStackScreenProps<
  TobuyStackParamList,
  'tobuy'
>;

const Drawer = createDrawerNavigator<DrawerParamsList>();
const TodoStack = createNativeStackNavigator<TodoStackParamList>();
const TobuyStack = createNativeStackNavigator<TobuyStackParamList>();

const TodoStackNavigator = () => (
  <TodoStack.Navigator screenOptions={{headerShown: false}}>
    <TodoStack.Screen name="todo" component={TodoScreen} />
    <TodoStack.Screen
      name="addTodo"
      component={ModalAddTodo}
      options={{
        presentation: 'modal',
        orientation: 'portrait',
        animation: 'slide_from_bottom',
      }}
    />
    <TodoStack.Screen
      name="editTodo"
      component={ModalEditTodo}
      options={{
        presentation: 'modal',
        orientation: 'portrait',
        animation: 'slide_from_bottom',
      }}
    />
  </TodoStack.Navigator>
);

const CloudTodoStackNavigator = () => {
  const {user} = useAuthentication();
  return (
    <TodoStack.Navigator screenOptions={{headerShown: false}}>
      <TodoStack.Screen
        name="todo"
        component={user ? CloudTodoScreen : SignInScreen}
      />
      <TodoStack.Screen
        name="addTodo"
        component={ModalAddCloudTodo}
        options={{
          presentation: 'modal',
          orientation: 'portrait',
          animation: 'slide_from_bottom',
        }}
      />
      <TodoStack.Screen
        name="editTodo"
        component={ModalEditCloudTodo}
        options={{
          presentation: 'modal',
          orientation: 'portrait',
          animation: 'slide_from_bottom',
        }}
      />
    </TodoStack.Navigator>
  );
};

const TobuyStackNavigator = () => (
  <TobuyStack.Navigator screenOptions={{headerShown: false}}>
    <TobuyStack.Screen name="tobuy" component={TobuyScreen} />
    <TobuyStack.Screen
      name="addTobuy"
      component={ModalAddTobuy}
      options={{
        presentation: 'modal',
        orientation: 'portrait',
        animation: 'slide_from_bottom',
      }}
    />
    <TobuyStack.Screen
      name="editTobuy"
      component={ModalEditTobuy}
      options={{
        presentation: 'modal',
        orientation: 'portrait',
        animation: 'slide_from_bottom',
      }}
    />
  </TobuyStack.Navigator>
);

function DrawerStackNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={DrawerContent}
      screenOptions={{headerShown: false}}>
      <Drawer.Screen name="todostack" component={TodoStackNavigator} />
      <Drawer.Screen name="tobuystack" component={TobuyStackNavigator} />
      <Drawer.Screen
        name="cloudtodostack"
        component={CloudTodoStackNavigator}
      />
      <Drawer.Screen name="colors" component={ColorsScreen} />
    </Drawer.Navigator>
  );
}

export default function App(): JSX.Element {
  const settingsTheme = useSettingsTheme();
  const SettingsTheme = {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      ...settingsTheme.colors,
    },
  };

  useEffect(() => {
    Orientation.lockToPortrait();
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  });

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <PaperProvider theme={SettingsTheme}>
        <NavigationContainer>
          <DrawerStackNavigator />
        </NavigationContainer>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
