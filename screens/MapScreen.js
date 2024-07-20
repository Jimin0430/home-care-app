import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";

import loadGoogleMapsAPI from "../components/loadGoogleMapsAPI"; // Import the function
import fetchPlaceData from "../apis/fetchPlaceData"; // Import the function

let MapViewMob, MarkerMob;

if (Platform.OS === "android" || Platform.OS === "ios") {
  MapViewMob = require("react-native-maps").default;
  MarkerMob = require("react-native-maps").Marker;
}
let MapView;

if (Platform.OS === "web") {
  MapView = require("@preflower/react-native-web-maps").default;
}

const LOCATION_KEY = "randomLocations";

function getRandomLatLngWithinRadius(lat, lng, radiusInKm) {
  const getRandomOffset = () => (Math.random() - 0.5) * 2 * (radiusInKm / 111); // 위도와 경도 1도의 거리는 약 111km

  const latitude = lat + getRandomOffset();
  const longitude = lng + getRandomOffset();

  return { latitude, longitude };
}

function generateRandomLocations(lat, lng, count, radiusInKm) {
  const locations = [];
  for (let i = 0; i < count; i++) {
    locations.push(getRandomLatLngWithinRadius(lat, lng, radiusInKm));
  }
  return locations;
}

function getCentralLocation(locations) {
  const latitudes = locations.map((loc) => loc.latitude);
  const longitudes = locations.map((loc) => loc.longitude);

  const latitude = latitudes.reduce((a, b) => a + b) / locations.length;
  const longitude = longitudes.reduce((a, b) => a + b) / locations.length;

  return { latitude, longitude };
}

export default class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
      googleMapsLoaded: false,
      region: null,
      randomLocations: null,
      loading: true,
    };
  }

  async componentDidMount() {
    await this.initializeMap();
  }

  async initializeMap() {
    try {
      const storedLocations = await AsyncStorage.getItem(LOCATION_KEY);
      if (storedLocations) {
        const randomLocations = JSON.parse(storedLocations);
        const centralLocation = getCentralLocation(randomLocations);
        this.setState({
          randomLocations,
          region: {
            latitude: centralLocation.latitude,
            longitude: centralLocation.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          },
          loading: false,
        });
      } else {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.error("Location permission not granted");
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const randomLocations = generateRandomLocations(
          location.coords.latitude,
          location.coords.longitude,
          3,
          5
        );
        const centralLocation = getCentralLocation(randomLocations);

        await AsyncStorage.setItem(
          LOCATION_KEY,
          JSON.stringify(randomLocations)
        );

        this.setState({
          randomLocations,
          region: {
            latitude: centralLocation.latitude,
            longitude: centralLocation.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          },
          loading: false,
        });

        this.fetchPlaces(randomLocations);
      }

      if (Platform.OS === "web") {
        loadGoogleMapsAPI(() => {
          this.setState({ googleMapsLoaded: true });
        });
      }
    } catch (error) {
      console.error("Error initializing map:", error);
    }
  }

  async fetchPlaces(locations) {
    try {
      const places = await fetchPlaceData(locations);
      this.setState({ places });
    } catch (error) {
      console.error("Error fetching place data:", error);
    }
  }

  onRegionChangeComplete = (region) => {
    this.setState({ region });
  };

  render() {
    const { googleMapsLoaded, region, places, randomLocations, loading } =
      this.state;

    if (loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
      <View style={styles.container}>
        {googleMapsLoaded && Platform.OS === "web" ? (
          <View style={styles.container}>
            <MapView
              style={styles.map}
              initialRegion={region}
              onRegionChangeComplete={this.onRegionChangeComplete}
            >
              {randomLocations.map((location, index) => (
                <MapView.Marker
                  key={index}
                  coordinate={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                  }}
                  title={`Random Location ${index + 1}`}
                />
              ))}

              {places.map((place, index) => (
                <MapView.Marker
                  key={index}
                  coordinate={{
                    latitude: place.geometry.location.lat,
                    longitude: place.geometry.location.lng,
                  }}
                  title={place.name}
                  description={place.vicinity}
                />
              ))}
            </MapView>
          </View>
        ) : Platform.OS === "android" || Platform.OS === "ios" ? (
          <View style={styles.container}>
            <MapViewMob
              style={styles.map}
              initialRegion={region}
              onRegionChangeComplete={this.onRegionChangeComplete}
            >
              {randomLocations.map((location, index) => (
                <MarkerMob
                  key={index}
                  coordinate={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                  }}
                  title={`Random Location ${index + 1}`}
                />
              ))}

              {places.map((place, index) => (
                <MarkerMob
                  key={index}
                  coordinate={{
                    latitude: place.geometry.location.lat,
                    longitude: place.geometry.location.lng,
                  }}
                  title={place.name}
                  description={place.vicinity}
                />
              ))}
            </MapViewMob>
          </View>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
