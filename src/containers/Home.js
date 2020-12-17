import React, { useRef, useState } from 'react';
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { BasicText, BasicIcon, BasicButton } from '../components'
// import Geolocation from 'react-native-geolocation-service'
import Geolocation from '@react-native-community/geolocation';

import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';

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

  const permission = async () => {
    const isAndroid = Platform.OS == "android"
    const perText = isAndroid ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION : PERMISSIONS.IOS.LOCATION_ALWAYS
    try {
      const locationAccess = await request(perText)
      console.log("ACCESS :", locationAccess);
      if (locationAccess == 'limited' | locationAccess == 'granted' | locationAccess == 'blocked') return true
      else return false

    } catch (err) {
      console.log("ACCESS ERR :", err);
      return false
    }
  }
  const onLocation = async () => {

    const isLocationAccess = await permission()
    if (!isLocationAccess) {
      alert(false)
      return;
    }
    Geolocation.getCurrentPosition(
      ({ coords }) => {
        if (map) {

          map?.current?.animateToRegion({
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
          })
        }
      },
      (error) => {
        console.log("ERROR :", error);
        if (error.code == error.PERMISSION_DENIED) {
          alert("Lokasyon bilgisi alınamadı. Ayarlar kısmından lokasyona izin verin");
        }
        else if (error.code == error.POSITION_UNAVAILABLE) {
          alert("Lokasyon bilgisi mevcut değil.");
        }
        else if (error.code == error.TIMEOUT) {
          alert("Lokasyon bilgisine erişilemedi. Tekrar deneyin.");
        }
      },
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
        // provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation
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