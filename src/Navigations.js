import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Test from './containers/Test'
import Home from './containers/Home'
import Login from './containers/Login'
import WordSelect from './containers/WordSelect'
import WordLearn from './containers/WordLearn'

const Stack = createStackNavigator();

const Navigations = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Test">
        <Stack.Screen name="Test" component={Test} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="WordSelect" component={WordSelect} options={{ headerShown: false }} />
        <Stack.Screen name="WordLearn" component={WordLearn} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default Navigations;