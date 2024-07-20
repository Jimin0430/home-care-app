/*
MIT License

Copyright (c) 2023 Pallavi Khedle

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import React, { Component } from "react";
import { StyleSheet, Text, View, Platform } from "react-native";

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

function getRandomLatLngWithinSeoul() {
  const centerLat = 37.5665; // 서울시 중심부 위도
  const centerLng = 126.978; // 서울시 중심부 경도
  const radiusInKm = 5; // 반경 5km

  const getRandomOffset = () => (Math.random() - 0.5) * 2 * (radiusInKm / 111); // 위도와 경도 1도의 거리는 약 111km

  const latitude = centerLat + getRandomOffset();
  const longitude = centerLng + getRandomOffset();

  return { latitude, longitude };
}

function generateRandomLocations(count) {
  const locations = [];
  for (let i = 0; i < count; i++) {
    locations.push(getRandomLatLngWithinSeoul());
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
    const randomLocations = generateRandomLocations(3);
    const centralLocation = getCentralLocation(randomLocations);

    this.state = {
      places: [],
      googleMapsLoaded: false,
      region: {
        latitude: centralLocation.latitude,
        longitude: centralLocation.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      },
      randomLocations: randomLocations,
    };
  }

  async componentDidMount() {
    if (Platform.OS === "web") {
      loadGoogleMapsAPI(() => {
        this.setState({ googleMapsLoaded: true });
        this.fetchPlaces();
      });
    } else {
      this.fetchPlaces();
    }
  }

  async fetchPlaces() {
    try {
      const places = await fetchPlaceData(this.state.randomLocations);
      this.setState({ places });
    } catch (error) {
      console.error("Error fetching place data:", error);
    }
  }

  onRegionChangeComplete = (region) => {
    this.setState({ region });
  };

  render() {
    const { googleMapsLoaded, region, places, randomLocations } = this.state;

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
