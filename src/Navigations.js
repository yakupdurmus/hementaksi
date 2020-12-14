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
import { getStoreValue, KEY_WORDCOUNT, setUser } from './helper';
import { BasicButton, BasicLoader, BasicIcon } from './components';
import WordImageMatch from './containers/WordImageMatch';
import WordTrEn from './containers/WordTrEn';
import WordEnTr from './containers/WordEnTr';
import WordStuffing from './containers/WordStuffing';

const StackApp = createStackNavigator();
const StackHome = createStackNavigator();
const Tab = createBottomTabNavigator();


const Navigations = () => {

  const [initial, setInitila] = useState("FirstLaunch")
  const [ready, setReady] = useState(false)

  useEffect(() => {

    getStoreValue(KEY_WORDCOUNT).then(value => {
      if (value) {
        setUser({ keywordCount: value });
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
        <StackHome.Screen name="Home" component={Home} options={{ title: "Önemli olan süreklilik" }} />
        <StackHome.Screen name="WordLearn" component={WordLearn} options={{ title: "Öğren" }} />
        <StackHome.Screen name="WordSelect" component={WordSelect} options={{ title: "Kelime Seç" }} />
        <StackHome.Screen name="WordImageMatch" component={WordImageMatch} options={{ title: "Kelime Resim Eşleştir" }} />
        <StackHome.Screen name="WordTrEn" component={WordTrEn} options={{ title: "Türkçeden İngilizceye" }} />
        <StackHome.Screen name="WordEnTr" component={WordEnTr} options={{ title: "İngilizceden Türkçeye" }} />
        <StackHome.Screen name="WordStuffing" component={WordStuffing} options={{ title: "İngilizceden Türkçeye" }} />
      </StackHome.Navigator>
    )
  }


  const TabRender = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home';
            } 
            else if (route.name === 'Progress') {
              iconName = focused
                ? 'linechart'
                : 'linechart';
            } 
            else if (route.name === 'Settings') {
              iconName = focused
                ? 'setting'
                : 'setting';
            } 

            // You can return any component that you like here!
            return <BasicIcon type="AntDesign"  name={iconName} size={size} style={{color:color}} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
        initialRouteName={"Home"}>
        <Tab.Screen name="Home" component={HomeRender} options={{ title: "Öğren" }} />
        <Tab.Screen name="Progress" component={Progress} options={{ title: "İlerleme" }} />
        <Tab.Screen name="Settings" component={Settings} options={{ title: "Ayarlar" }} />
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
        <StackApp.Screen name="Home" component={TabRender} options={{ headerShown: false }} />
      </StackApp.Navigator>
    </NavigationContainer>
  )
};

export default Navigations;