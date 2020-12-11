import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Test from './containers/Test'
import Home from './containers/Home'
import Login from './containers/Login'
import WordSelect from './containers/WordSelect'
import WordLearn from './containers/WordLearn'
import FirstLaunch from './containers/FirstLaunch'
import { getStoreValue, KEY_WORDCOUNT } from './helper';
import { BasicLoader } from './components';

const Stack = createStackNavigator();

const Navigations = () => {

  const [initial, setInitila] = useState("FirstLaunch")
  const [ready, setReady] = useState(false)

  useEffect(() => {

    getStoreValue(KEY_WORDCOUNT).then(value => {
      if (value) {
        setInitila("Home")
      }
      setTimeout(() => {
        setReady(true)
      }, 1500)
    })

  }, [])

  if (!ready) return <BasicLoader />
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initial}>
        <Stack.Screen name="Test" component={Test} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="FirstLaunch" component={FirstLaunch} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="WordSelect" component={WordSelect} options={{ headerShown: false }} />
        <Stack.Screen name="WordLearn" component={WordLearn} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default Navigations;