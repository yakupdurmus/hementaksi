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
    }, 1000)
  }, [])

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/logo-500x132.png')}
      />
      <LottieView
        autoPlay
        style={{ zIndex: 2 }}
        source={require('../assets/launch-taxi.json')}
      />
      <View style={styles.bottomBox}>
        <Image style={styles.fligran} resizeMode="contain" source={require('../assets/map-800x800.jpg')} />
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
  image: {
    width: screenWidth / 3 * 2,
    height: screenWidth / 3 * 2 / 3.787878,
    position: 'absolute',
    alignSelf: 'center',
    top: screenWidth / 3,
    zIndex: 3
  },
  bottomBox: {
    position: 'absolute',
    zIndex: 1,
    backgroundColor: color.yellow,
    bottom: 0,
    height: screenHeight / 2,
    width: '100%'
  },
  fligran: {
    width: screenHeight / 2,
    height: screenHeight / 2,
    opacity: 0.1
  }

});
export default FirstLaunch;