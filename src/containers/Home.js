import React, { useRef, useState, useEffect } from 'react';
import MapView, { Region } from 'react-native-maps';
import { View, StyleSheet } from 'react-native';
import { BasicText, BasicIcon, BasicButton } from '../components'

import { color, onLocation, onPermission, onZoom, showMessage, showFullMessage, hideMessage, showLoading,goLocation } from '../helper'


const Home = (props) => {

  const { navigation, route: { params } } = props
  const { coords } = params


  const map = useRef(null);
  const initRegion = {
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
    ...coords
  }


  const onZoomIn = () => onZoom(1, map)
  const onZoomOut = () => onZoom(-1, map)
  const goLocationAnimated = () => {
    goLocation(map)
  }

  const RenderButton = () => {
    return (
      <View style={styles.buttonContainer}>
        <BasicButton onPress={onZoomIn} style={styles.button}>
          <BasicIcon style={styles.icon} name="plus" type="SimpleLineIcons" />
        </BasicButton>
        <View style={{ flexDirection: 'row' }}>
          <BasicButton onPress={goLocationAnimated} style={styles.button}>
            <BasicIcon style={styles.icon} name="location-pin" type="SimpleLineIcons" />
          </BasicButton>
          <BasicButton onPress={onZoomOut} style={styles.button}>
            <BasicIcon style={styles.icon} name="minus" type="SimpleLineIcons" />
          </BasicButton>
        </View>
      </View>
    )
  }
  return (
    <>
      <MapView
        ref={map}
        style={styles.map}
        showsUserLocation
        initialRegion={initRegion}
      // provider={PROVIDER_GOOGLE}
      // onRegionChange={onRegionChange}
      />
      <RenderButton />
    </>
  );
};
const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    end: 10,
  },
  button: {
    padding: 8,
    margin: 5,
    backgroundColor: color.orange,
    alignSelf: 'flex-end',
    borderRadius: 5,
  },
  icon: {
    fontSize: 22,
    flex: 1,
    color: color.white,
  },
});
export default Home;