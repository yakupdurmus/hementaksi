import React, {useRef, useState} from 'react';
import MapView, {PROVIDER_GOOGLE, Region} from 'react-native-maps';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
const FirstLaunch = () => {
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
  const onZoomIn = () => onZoom(1);
  const onZoomOut = () => onZoom(-1);
  return (
    <>
      <MapView
        ref={map}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={region}
        onRegionChange={onRegionChange}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onZoomIn}>
          <Text style={styles.text}>+</Text>
        </TouchableOpacity>
        <View style={styles.spacer} />
        <TouchableOpacity style={styles.button} onPress={onZoomOut}>
          <Text style={styles.text}>-</Text>
        </TouchableOpacity>
      </View>
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
    borderRadius: 5,
    backgroundColor: '#fff',
    padding: 12,
  },
  button: {},
  text: {
    textAlign: 'center',
  },
  spacer: {
    marginVertical: 7,
  },
});
export default FirstLaunch;