import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Navigations from './Navigations';

const AppContainer = () => {
  return (
    <View style={styles.container}>
      <Navigations />
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