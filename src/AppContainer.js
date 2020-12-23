import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Navigations from './Navigations';
import FlashMessage from "react-native-flash-message";
import AppContext from './context'

const AppContainer = () => {

  const [currentCoord, setCurrentCoord] = useState();
  const [destinationCoord, setDestinationCoord] = useState();
  const [sourceCoord, setSourceCoord] = useState();
  const [selectCoord, setSelectCoord] = useState();

  return (
    <View style={styles.container}>
      <AppContext.Provider
        value={{
          currentCoord,
          setCurrentCoord,
          destinationCoord,
          setDestinationCoord,
          sourceCoord,
          setSourceCoord,
          selectCoord,
          setSelectCoord
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