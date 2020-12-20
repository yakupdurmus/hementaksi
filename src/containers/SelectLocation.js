import React, { useRef, useContext } from 'react';
import MapView, { Region } from 'react-native-maps';
import { View, StyleSheet } from 'react-native';
import { BasicButton, BasicLoader, MapButtons, SelectLocationTop } from '../components'
import { color } from '../helper';
import AppContext from '../context'


const SelectLocationBottom = ({ mapRef }) => {


  return (
    <View style={styles.bottomContent}>
      <BasicButton
        onPress={() => { }}
        orange
        style={{ height: 50, flex: 1, marginLeft: 5 }}
        textStyle={{ fontWeight: 'bold' }}
      >Tamam</BasicButton>
      <MapButtons buttonStyle={{ height: 50 }} hideMinus hidePlus mapRef={mapRef} />
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
      <SelectLocationTop navigation={navigation} />
      <MapView
        ref={selectMap}
        style={styles.selectMap}
        showsUserLocation
        initialRegion={currentCoord}
      />
      <SelectLocationBottom mapRef={selectMap} />
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
    height: 70,
    bottom: 0,
    backgroundColor: color.white,
    zIndex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
export default SelectLocation;