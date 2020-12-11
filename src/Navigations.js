import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import Test from './containers/Test'
import Login from './containers/Login'

import Home from './containers/Home'
import Progress from './containers/Progress'
import Settings from './containers/Settings'
import WordSelect from './containers/WordSelect'
import WordLearn from './containers/WordLearn'
import FirstLaunch from './containers/FirstLaunch'
import { getStoreValue, KEY_WORDCOUNT } from './helper';
import { BasicLoader } from './components';

const StackApp = createStackNavigator();
const StackHome = createStackNavigator();
const Tab = createBottomTabNavigator();


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


  const HomeRender = () => {
    return (
      <StackHome.Navigator initialRouteName={"Home"}>
        <StackHome.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <StackHome.Screen name="WordLearn" component={WordLearn} />
        <StackHome.Screen name="WordSelect" component={WordSelect} />
      </StackHome.Navigator>
    )
  }


  const TabRender = () => {
    return (
      <Tab.Navigator initialRouteName={"Home"}>
        <Tab.Screen name="Home" component={HomeRender} options={{ title: "Öğren" }} />
        <Tab.Screen name="Progress" component={Progress} options={{ title: "İlerleme" }} />
        <Tab.Screen name="Ayarlar" component={Settings} options={{ title: "Ayarlar" }} />
      </Tab.Navigator>
    )
  }
  /*
  Header dinamik değişerek motivasyon pompalasın
  */
  if (!ready) return <BasicLoader />
  return (
    <NavigationContainer>
      <StackApp.Navigator initialRouteName={initial} >
        <StackApp.Screen name="FirstLaunch" component={FirstLaunch} options={{ headerShown: false }} />
        <StackApp.Screen name="Home" component={TabRender} options={{ title: "Önemli olan süreklilik" }} />
      </StackApp.Navigator>
    </NavigationContainer>
  )
};

export default Navigations;