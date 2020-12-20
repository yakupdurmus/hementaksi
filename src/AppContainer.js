import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Navigations from './Navigations';
import FlashMessage from "react-native-flash-message";
import AppContext from './context'

const AppContainer = () => {

  const [currentCoord, setCurrentCoord] = useState();
  const [nextCoord, setNextCoord] = useState();

  return (
    <View style={styles.container}>
      <AppContext.Provider
        value={{
          currentCoord,
          setCurrentCoord,
          nextCoord,
          setNextCoord,
        }}
      >
        <Navigations />
        <FlashMessage />
      </AppContext.Provider>
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