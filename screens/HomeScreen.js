import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import HomeBanner from "../assets/images/home-banner.svg";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageViewer}>
        <HomeBanner width={500} height={150} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  imageViewer: {
    width: "100%",
    height: "20%",
    marginBottom: 10,
  },
  bannerImage: {
    flex: 1,
    width: "80%",
    height: "30%",
    alignItems: "center",
  },
});
