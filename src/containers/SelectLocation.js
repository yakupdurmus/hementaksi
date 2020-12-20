import React, { useRef, useContext } from 'react';
import MapView, { Region } from 'react-native-maps';
import { View, StyleSheet } from 'react-native';
import { BasicLoader, MapButtons, TopButton } from '../components'
import { color } from '../helper';
import AppContext from '../context'


const SelectBottomContent = ({ mapRef }) => {


  return (
    <View style={styles.bottomContent}>
      <MapButtons mapRef={mapRef} />
    </View>
  )
}


const SelectLocation = (props) => {

  const { navigation } = props
  const { currentCoord } = useContext(AppContext)
  const selectMap = useRef(null);

  if (!currentCoord) return <BasicLoader />

  return (
    <>
      <TopButton navigation={navigation} />
      <MapView
        ref={selectMap}
        style={styles.selectMap}
        showsUserLocation
        initialRegion={currentCoord}
      />
      <SelectBottomContent mapRef={selectMap} />
    </>
  );
};
const styles = StyleSheet.create({
  selectMap: {
    flex: 1,
  },
  bottomContent: {
    position: 'absolute',
    width: '100%',
    height: 100,
    bottom: 0,
    backgroundColor: color.white,
    zIndex: 2
  }
});
export default SelectLocation;