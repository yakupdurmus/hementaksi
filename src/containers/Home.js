import React, { useRef, useContext } from 'react';
import MapView, { Region } from 'react-native-maps';
import { View, StyleSheet } from 'react-native';
import { BasicLoader, BottomContent, TopButton } from '../components'
import BottomSheet from 'reanimated-bottom-sheet';
import AppContext from '../context'



const Home = (props) => {

  const { navigation } = props
  const { currentCoord } = useContext(AppContext)

  //Kontrol
  if (!currentCoord) return <BasicLoader />

  const map = useRef(null);
  const sheetRef = React.useRef(null);

  return (
    <>
      <TopButton navigation={navigation} />
      <MapView
        ref={map}
        style={styles.map}
        showsUserLocation
        initialRegion={currentCoord}
      // provider={PROVIDER_GOOGLE}
      // onRegionChange={onRegionChange}
      />
      <BottomSheet
        ref={sheetRef}
        snapPoints={[280, 280, 100]}
        borderRadius={10}
        renderContent={() => <BottomContent navigation={navigation} mapRef={map} />}
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