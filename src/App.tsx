import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Text, View} from 'react-native';

const Drawer = createDrawerNavigator();

const TodoScreen = () => (
  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <Text>Todo</Text>
  </View>
);

const TobuyScreen = () => (
  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <Text>Tobuy</Text>
  </View>
);

export default function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="todo" component={TodoScreen} />
        <Drawer.Screen name="tobuy" component={TobuyScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
