import React from "react";
import { StyleSheet, View, Text } from "react-native";
import MapScreen from "../MapScreen";
import Header from "../../components/Header";
import { Color } from "../../styles/color";

import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
const CaregiverSearchEducation = () => {
  return (
    <View style={styles.container}>
      <Header title={"교육기관 찾기"} />
      <View style={styles.top}>
        <View style={[styles.keyWrapper, { marginBottom: 20, gap: 0 }]}>
          <Text style={styles.title}>부평 헬렌켈러님!</Text>
          <MaterialCommunityIcons
            name="penguin"
            size={21}
            color={Color.pink900}
          />
        </View>
        <Text style={styles.description}>
          주변에서 인증된 교육기관을 발견했어요.
        </Text>
        <View style={styles.infoBox}>
          <View style={styles.infoTextKey}>
            <View style={styles.keyWrapper}>
              <FontAwesome name="map-pin" size={13} color={Color.pink900} />
              <Text style={styles.infoText}>설정 주소</Text>
            </View>
            <View style={styles.keyWrapper}>
              <FontAwesome name="map-pin" size={13} color={Color.pink900} />
              <Text style={styles.infoText}>범위</Text>
            </View>
          </View>
          <View style={styles.infoTextData}>
            <Text style={styles.infoText}>인천 미추홀구 소성로40</Text>
            <Text style={styles.infoText}>인근 10km</Text>
          </View>
          <View style={styles.verticalLine} />
        </View>
        <View style={styles.horizontalLine} />
        <View style={[styles.keyWrapper, { marginTop: 10, gap: 1 }]}>
          {/* <Feather name="map-pin" size={18} color={Color.pink900} /> */}
          <Entypo name="location-pin" size={30} color={Color.pink900} />
          <Text style={styles.institutionCount}>발견된 교육기관 수 : 3개</Text>
        </View>
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
  top: {
    padding: 16,
    paddingHorizontal: 40,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    fontWeight: "450",
    marginBottom: 10,
  },
  infoBox: {
    flexDirection: "row",
    // backgroundColor: "#7de4da",
    backgroundColor: "#9be5de",
    paddingHorizontal: 25,
    paddingVertical: 18,
    borderRadius: 4,
    marginBottom: 12,
    shadowColor: "#000", // 그림자의 색상
    shadowOffset: { width: 0, height: 50 }, // 그림자의 오프셋 (x, y)
    shadowOpacity: 0.25, // 그림자의 불투명도
    shadowRadius: 0.3, // 그림자의 반경
    elevation: 10, // Android에서의 그림자 높이
    justifyContent: "center",
    alignItems: "center",
    position: "relative", // 자식 요소의 절대 위치 지정을 위해 추가
    marginTop: 2,
    // marginBottom: 5,
  },
  keyWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  infoTextKey: {
    flex: 1.3,
  },
  infoTextData: {
    flex: 2,
  },
  verticalLine: {
    position: "absolute",
    left: "42%", // (1.2 / (1.2 + 2)) * 100%
    top: 21,
    bottom: 12,
    width: 0.4,
    backgroundColor: "white",
    height: 46,
  },
  horizontalLine: {
    width: "100%",
    backgroundColor: Color.gray500,
    height: 0.5,
  },
  infoText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
    marginBottom: 4,
  },
  institutionCount: {
    fontSize: 17,
    fontWeight: "bold",
    paddingBottom: 3,
  },
  mapContainer: {
    flex: 1,
    minHeight: "50%",
  },
});

export default CaregiverSearchEducation;
