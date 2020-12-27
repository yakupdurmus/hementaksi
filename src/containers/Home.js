import React, { useRef, useContext, useState, useEffect } from 'react';
import MapView, { Region, Marker } from 'react-native-maps';
import { StyleSheet } from 'react-native';
import { BasicLoader, HomeBottom, HomeTop, MapPointer } from '../components'
import BottomSheet from 'reanimated-bottom-sheet';
import AppContext from '../context'
import database from '@react-native-firebase/database';


let regionTimer;
const Home = (props) => {

  const { navigation } = props
  const { currentCoord, selectCoord, sourceCoord, setSourceCoord } = useContext(AppContext)
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

  const onRegionChange = (region) => {

    regionTimer && clearTimeout(regionTimer)
    regionTimer = setTimeout(() => {

      setSourceCoord(region)
      console.log("onRegionChange :", region,region.latitude);

    }, 500)
  }

  return (
    <>
      <HomeTop navigation={navigation} />
      <MapPointer />
      <MapView
        ref={map}
        style={styles.map}
        showsUserLocation
        initialRegion={sourceCoord}
        region={sourceCoord}
        onRegionChange={onRegionChange}
      // provider={PROVIDER_GOOGLE}
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
        snapPoints={[275, 275, 100]}
        borderRadius={10}
        renderContent={() => <HomeBottom navigation={navigation} mapRef={map} />}
      />
    </>
  );
};
const styles = StyleSheet.create({
  map: {
    flex: 1,
  }
});
export default React.memo(Home);