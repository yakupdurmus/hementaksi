import React from 'react';
import { SafeAreaView,StyleSheet } from 'react-native';
import Navigations from './Navigations';

const AppContainer = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Navigations />
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  }
});

export default AppContainer;