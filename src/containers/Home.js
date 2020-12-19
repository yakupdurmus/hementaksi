import React, { useRef } from 'react';
import MapView, { Region } from 'react-native-maps';
import { View, StyleSheet } from 'react-native';
import { BasicLoader, BottomContent, TopButton } from '../components'
import BottomSheet from 'reanimated-bottom-sheet';




const Home = (props) => {

  const { navigation, route: { params } } = props

  //Kontrol
  if (!params || !params.coords) return <BasicLoader />

  const { coords } = params
  const initRegion = {
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
    ...coords
  }

  const map = useRef(null);
  const sheetRef = React.useRef(null);

  return (
    <>
      <TopButton navigation={navigation} />
      <MapView
        ref={map}
        style={styles.map}
        showsUserLocation
        initialRegion={initRegion}
      // provider={PROVIDER_GOOGLE}
      // onRegionChange={onRegionChange}
      />
      <BottomSheet
        ref={sheetRef}
        snapPoints={[280, 280, 100]}
        borderRadius={10}
        renderContent={() => <BottomContent mapRef={map} />}
      />
    </>
  );
};
const styles = StyleSheet.create({
  map: {
    flex: 1,
  }
});
export default Home;