import React, { useEffect, useContext } from 'react';
import { View, StyleSheet, Image, SafeAreaView } from 'react-native';
import { screenWidth, screenHeight, color } from '../helper'
import LottieView from 'lottie-react-native';
import { onLocation, appVersion } from '../helper'
import { BasicText } from '../components';
import AppContext from '../context'
let timer
const FirstLaunch = (props) => {

  const { setCurrentCoord, setNextCoord } = useContext(AppContext)
  const { navigation } = props

  useEffect(() => {

    onLocation((coords) => {

      timer && clearTimeout(timer)
      timer = setTimeout(() => {

        const region = {
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
          ...coords,
        }

        
        setCurrentCoord(region)
        setNextCoord(region)
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      }, 500)

    })
  }, [])

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/logo-500x132.png')}
      />
      <View style={styles.animationBox}>
        <LottieView
          autoPlay
          resizeMode='cover'
          source={require('../assets/launch-taxi.json')}
        />
      </View>
      <View style={styles.bottomBox}>
        <SafeAreaView style={styles.safeArea}><BasicText style={styles.textStyle}>Lokasyon bilgisi bekleniyor...{`\n\n`}© 2020 Hemen Taksi{`\n`}v{appVersion}</BasicText></SafeAreaView>
        <Image style={styles.fligran} source={require('../assets/map-800x800.jpg')} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.smokes,
    zIndex: 0
  },
  logo: {
    width: screenWidth / 3 * 2,
    height: screenWidth / 3 * 2 / 3.787878,
    position: 'absolute',
    alignSelf: 'center',
    top: screenWidth / 5,
    zIndex: 3
  },
  animationBox: {
    width: screenWidth,
    height: screenWidth,
    position: 'absolute',
    zIndex: 2,
    top: (screenHeight / 2 - screenWidth / 2)
  },
  bottomBox: {
    zIndex: 1,
    backgroundColor: color.yellow,
    height: screenHeight / 2,
    width: screenWidth,
    position: 'absolute',
    top: screenHeight / 2,
  },
  fligran: {
    width: screenWidth,
    height: screenHeight / 2,
    opacity: .2
  },
  textStyle: {
    textAlign: 'center',
  },
  safeArea: {
    position: 'absolute',
    bottom: 25,
    alignSelf: 'center',
  }

});
export default FirstLaunch;