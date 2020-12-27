import React, { useRef, useContext } from 'react';
import MapView, { Region, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet } from 'react-native';
import { BasicLoader, SelectLocationTop, MapPointer, SelectLocationBottom } from '../components'
import { color } from '../helper';
import AppContext from '../context'
import mapStyle from '../assets/mapStyle.json'



let regionTimer;
const SelectLocation = (props) => {

  const { navigation } = props
  const { currentCoord, selectCoord, setSelectCoord } = useContext(AppContext)
  const selectMap = useRef(null);

  const onRegionChange = (region) => {

    regionTimer && clearTimeout(regionTimer)
    regionTimer = setTimeout(() => {

      setSelectCoord(region)
      console.log("onRegionChange :", region);

    }, 500)
  }

  if (!selectCoord) return <BasicLoader />
  console.log("Select Location selectCoord : ", selectCoord);
  return (
    <>
      <SelectLocationTop navigation={navigation} currentCoord={currentCoord} />
      <MapPointer />
      <MapView
        ref={selectMap}
        style={styles.selectMap}
        initialRegion={selectCoord}
        region={selectCoord}
        showsUserLocation
        onRegionChange={onRegionChange}
        provider={PROVIDER_GOOGLE}
        liteMode={true}
        rotateEnabled={false}
        pitchEnabled={false}
        toolbarEnabled={false}
        customMapStyle={mapStyle}

      />
      <SelectLocationBottom navigation={navigation} mapRef={selectMap} />
    </>
  );
};
const styles = StyleSheet.create({
  selectMap: {
    flex: 1,
  }
});
export default SelectLocation;