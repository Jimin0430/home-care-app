import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, Dimensions } from "react-native";
// import MapView, { Marker } from "react-native-maps";
import MapView from "react-native-maps";
import * as Location from "expo-location";

export default function Map({ width = "100%", height = "100%" }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);

      // Reverse geocoding to get address
      let address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setAddress(address[0]);
      console.log("Current Address:", address[0]);
    })();
  }, []);

  if (location) {
    return (
      <View style={[styles.container, { width, height }]}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {/* <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="You are here"
          /> */}
        </MapView>
      </View>
    );
  }

  return (
    <View style={[styles.container, { width, height }]}>
      <MapView style={styles.map} />
      {errorMsg ? <Text>{errorMsg}</Text> : <Text>Loading...</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
