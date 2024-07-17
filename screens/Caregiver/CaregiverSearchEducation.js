import React from "react";
import { StyleSheet, View, Text } from "react-native";
import MapScreen from "../MapScreen";

const CaregiverSearchEducation = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>교육기관 찾기</Text>
        <Text style={styles.subtitle}>부평 헬렌켈러님!</Text>
        <Text style={styles.description}>
          주변에서 인증된 교육기관을 발견했어요.
        </Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            설정 주소 범위: 인천 미추홀구 소성로40 인근 10km
          </Text>
        </View>
        <Text style={styles.institutionCount}>발견된 교육기관 수 : 4개</Text>
      </View>
      <View style={styles.mapContainer}>
        <MapScreen />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 16,
    backgroundColor: "#f2f2f2",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
  },
  infoBox: {
    backgroundColor: "#e0e0e0",
    padding: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
  },
  institutionCount: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
  },
  mapContainer: {
    flex: 1,
    height: "66%",
  },
});

export default CaregiverSearchEducation;
