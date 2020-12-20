import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './containers/Home'
import FirstLaunch from './containers/FirstLaunch'
import SelectLocation from './containers/SelectLocation';

const StackApp = createStackNavigator();


const Navigations = () => {

  return (
    <NavigationContainer>
      <StackApp.Navigator initialRouteName={"FirstLaunch"} >
        <StackApp.Screen name="FirstLaunch" component={FirstLaunch} options={{ headerShown: false }} />
        <StackApp.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <StackApp.Screen name="SelectLocation" component={SelectLocation} options={{ headerShown: false }} />
      </StackApp.Navigator>
    </NavigationContainer>
  )
};

export default Navigations;