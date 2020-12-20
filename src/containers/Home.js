import React, { useRef, useContext, useState, useEffect } from 'react';
import MapView, { Region, Marker } from 'react-native-maps';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { BasicButton, BasicLoader, BottomContent, TopButton } from '../components'
import BottomSheet from 'reanimated-bottom-sheet';
import AppContext from '../context'
import database from '@react-native-firebase/database';



const Home = (props) => {

  const { navigation } = props
  const { currentCoord } = useContext(AppContext)
  const [taxiLocation, setTaxiLocation] = useState([])


  //Kontrol
  if (!currentCoord) return <BasicLoader />

  const map = useRef(null);
  const sheetRef = React.useRef(null);

  useEffect(() => {

    database()
      .ref('/location')
      .on('value', values => {
        const val = values.val();
        console.log('Firebase RealTime :', val)
        if (val) setTaxiLocation(val)
      });

  }, [])

  console.log("RealTime Taxi Location", taxiLocation);
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
      >
        {taxiLocation.map(item => {

          return (
            <Marker
              key={item.key}
              coordinate={item}
              image={require('../assets/taxipin-64x64.png')}
            // title={item.key}
            // description={item.key}
            />

          )

        })}
      </MapView>
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