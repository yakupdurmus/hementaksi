import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { screenWidth, screenHeight, color } from '../helper'
import LottieView from 'lottie-react-native';
const FirstLaunch = (props) => {

  const { navigation } = props
  useEffect(() => {
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }, 3000)
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
  }

});
export default FirstLaunch;