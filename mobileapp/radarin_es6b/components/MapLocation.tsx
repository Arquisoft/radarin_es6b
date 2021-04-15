import * as React from 'react';
import MapView from 'react-native-maps';
import Marker from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

import { useState, useEffect } from 'react';
import { Platform} from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';

export default function Map() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android' && !Constants.isDevice) {
        setErrorMsg('Oops, this will not work on Snack in an Android emulator. Try it on your device!');
        return;
      }
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = location;
  }
  if(text.coords){
    return (
        <MapView style={styles.map} 
        initialRegion={{
          latitude: text.coords.latitude,
          longitude: text.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
          <MapView.Marker
            coordinate={{latitude: text.coords.latitude,
            longitude: text.coords.longitude,}}
            title={"Ubicacion"}
            description={"Aqui se encuentra usted"}
          />
        </MapView>
    );
  }else{
    return (
      <MapView style={styles.map}>
      </MapView>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});