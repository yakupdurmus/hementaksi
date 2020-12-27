import React, { useRef, useContext, useState, useEffect } from 'react';
import MapView, { Region, Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet } from 'react-native';
import { BasicLoader, HomeBottom, HomeTop, MapPointer } from '../components'
import BottomSheet from 'reanimated-bottom-sheet';
import AppContext from '../context'
import database from '@react-native-firebase/database';
import { getDirections } from '../services';
import MapViewDirections from 'react-native-maps-directions';
import { apiKey, language } from '../services/config';


let regionTimer;
const Home = (props) => {

  const { navigation } = props
  const { currentCoord, selectCoord, sourceCoord, setSourceCoord, destinationCoord } = useContext(AppContext)
  const [taxiLocation, setTaxiLocation] = useState([])
  const [rotateSteps, setRotateSteps] = useState([])


  //Kontrol
  if (!currentCoord) return <BasicLoader />

  const map = useRef(null);
  const sheetRef = React.useRef(null);

  useEffect(() => {

    database()
      .ref('/location')
      .on('value', values => {
        const val = values.val();
        console.log('[WR] Firebase RealTime :', val)
        if (val) setTaxiLocation(val.slice(0, 10))
      });

  }, [])

  useEffect(() => {

    if (!sourceCoord?.latitude || !destinationCoord?.latitude) return

    const source = `${sourceCoord.latitude},${sourceCoord.longitude}`
    const destination = `${destinationCoord.latitude},${destinationCoord.longitude}`

    getDirections(source, destination).then(data => {
      console.log("Directions data: ", data);
      let steps = [{
        latitude: data.start_location.lat,
        longitude: data.start_location.lng
      }]

      data.steps.map(item => {
        steps.push({
          latitude: item.end_location.lat,
          longitude: item.end_location.lng,
        })
      })

      setRotateSteps(steps)

    })


  }, [sourceCoord, destinationCoord])

  const onRegionChange = (region) => {

    if (destinationCoord && destinationCoord?.latitude) return;

    regionTimer && clearTimeout(regionTimer)
    regionTimer = setTimeout(() => {

      setSourceCoord(region)
      console.log("onRegionChange :", region, region.latitude);

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
        provider={PROVIDER_GOOGLE}
        liteMode={true}
        rotateEnabled={false}
        pitchEnabled={false}
        toolbarEnabled={false}
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

        {destinationCoord && sourceCoord && sourceCoord?.latitude && destinationCoord.latitude && rotateSteps.length > 0 && (
          <MapViewDirections
            origin={sourceCoord}
            destination={destinationCoord}
            language={language}
            apikey={apiKey}
            strokeWidth={3}
            strokeColor="hotpink"
          />)}


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