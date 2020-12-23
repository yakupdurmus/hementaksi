import React, { useRef, useContext } from 'react';
import MapView, { Region } from 'react-native-maps';
import { StyleSheet } from 'react-native';
import { BasicLoader, SelectLocationTop, MapPointer, SelectLocationBottom } from '../components'
import { color } from '../helper';
import AppContext from '../context'


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
      />
      <SelectLocationBottom mapRef={selectMap} />
    </>
  );
};
const styles = StyleSheet.create({
  selectMap: {
    flex: 1,
  }
});
export default SelectLocation;