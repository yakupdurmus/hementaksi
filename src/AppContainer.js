import React from 'react';
import { StyleSheet, View } from 'react-native';
import Navigations from './Navigations';
import FlashMessage from "react-native-flash-message";

const AppContainer = () => {
  return (
    <View style={styles.container}>
      <Navigations />
      <FlashMessage />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  }
});

export default AppContainer;