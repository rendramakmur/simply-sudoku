import React from 'react';
import { Provider } from 'react-redux';
import store from './store/index';
import Home from './screens/Home';
import Game from './screens/Game';
import Finish from './screens/Finish';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home}/>
          <Stack.Screen name="Simply Sudoku" component={Game}/>
          <Stack.Screen name="Finish" component={Finish}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
