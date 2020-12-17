import React, { useRef, useState } from 'react';
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { BasicText, BasicIcon, BasicButton } from '../components'
import Geolocation from 'react-native-geolocation-service'
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';

import { color } from '../helper'
const Home = () => {
  const map = useRef(null);
  const [region, setRegion] = useState({
    latitude: 41.0391683,
    longitude: 28.9982707,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const onRegionChange = (changedRegion) => {
    setRegion(changedRegion);
  };
  const zoomDelta = 0.005;
  const onZoom = (zoomSign) => {
    const zoomedRegion = {
      latitude: region.latitude,
      longitude: region.longitude,
      latitudeDelta: region.latitudeDelta - zoomDelta * zoomSign,
      longitudeDelta: region.longitudeDelta - zoomDelta * zoomSign,
    };
    setRegion(zoomedRegion);
    map.current?.animateToRegion(zoomedRegion);
  };

  const permission = () => {
    const isAndroid = Platform.OS == "android"
    const perText = isAndroid ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION : PERMISSIONS.IOS.LOCATION_ALWAYS
    check(perText)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log('This feature is not available (on this device / in this context)');
            return false
            break;
          case RESULTS.DENIED:
            console.log('The permission has not been requested / is denied but requestable');
            return false
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            return true
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            return true
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            return false
            break;
        }
      })
      .catch((error) => {
        alert(error.message)
        return false
      });
  }
  const onLocation = () => {

    const isLocationAccess = permission();
    if(!isLocationAccess){
      alert(false)
      return;
    }

    Geolocation.getCurrentPosition(
      ({ coords }) => {
        if (map) {

          map.animateToRegion({
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
          })
        }
      },
      (error) => alert('Error: Are location services on?' + error.message),
      { enableHighAccuracy: true }
    )
  }
  const onZoomIn = () => onZoom(1);
  const onZoomOut = () => onZoom(-1);

  const RenderButton = () => {
    return (
      <View style={styles.buttonContainer}>
        <BasicButton onPress={onZoomIn} style={styles.button}>
          <BasicIcon style={styles.icon} name="plus" type="SimpleLineIcons" />
        </BasicButton>
        <View style={{ flexDirection: 'row', borderTopWidth: 1, borderColor: color.border1 }}>
          <BasicButton onPress={onLocation} style={[styles.button, { borderRightWidth: 1, borderColor: color.border1 }]}>
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
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={region}
        onRegionChange={onRegionChange}
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
    bottom: 30,
    end: 20,
  },
  button: {
    padding: 8,
    backgroundColor: color.white,
    alignSelf: 'flex-end',
  },
  icon: {
    fontSize: 20,
    flex: 1,
  },
});
export default Home;