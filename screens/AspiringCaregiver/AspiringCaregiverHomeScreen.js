import React from "react";
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Color } from "../../styles/color";

const windowHeight = Dimensions.get("window").height;

export default function AspiringCaregiverHomeScreen() {
  const boxHeight = windowHeight * 0.48; // 화면 세로 길이의 40% 계산
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.imageViewer}>
          <ImageBackground
            source={require("../../assets/images/homeBanner.jpg")}
            style={styles.bannerImage}
            resizeMode="cover"
          >
            <Text style={styles.bannerText}>환자 찾기</Text>
          </ImageBackground>
        </View>

        <View style={[styles.homeMainContainer, { height: boxHeight }]}>
          <View style={styles.mainInnerContainer}>
            <View
              style={[
                styles.leftInnerBox,
                { flex: 3, backgroundColor: Color.pink700 },
              ]}
            >
              <Text style={styles.mainBoxInnerText}>
                오프라인 {"\n"}정기교육 {"\n"}신청하기
              </Text>
            </View>
            <View
              style={[
                styles.leftInnerBox,
                { flex: 2, backgroundColor: Color.pink400 },
              ]}
            >
              <Text style={styles.mainBoxInnerTextHighlight}>
                일정{"\n"}관리하기
              </Text>
            </View>
          </View>

          <View style={styles.mainInnerContainer}>
            <View
              style={[
                styles.leftInnerBox,
                { flex: 1.1, backgroundColor: Color.grin600 },
              ]}
            >
              <Text style={styles.mainBoxInnerText}>
                나의 리뷰 {"\n"}관리하기
              </Text>
            </View>

            <View
              style={[
                styles.leftInnerBox,
                { flex: 2, backgroundColor: Color.grin500 },
              ]}
            >
              <Text style={styles.mainBoxInnerText}>
                요양사{"\n"}커뮤니티{"\n"}살펴보기
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.communityContainer}>
          <View style={styles.communityTop}>
            <Text style={styles.middleTitle}>커뮤니티 글</Text>
            <Text style={styles.middleText}>더보기 {">"}</Text>
          </View>
          <View style={styles.communityBox}>
            <Text style={styles.middleTitle}>
              이런 상황의 대처법이 궁금해요
            </Text>
            <Text>답변 4개</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  scrollViewContent: {
    alignItems: "center",
  },
  imageViewer: {
    width: "100%",
    height: 170,
    borderRadius: 10,
    overflow: "hidden",
  },
  bannerImage: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 30,
  },
  bannerText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 30,
  },
  homeMainContainer: {
    flexDirection: "row",
    gap: 6,
    width: "100%",
  },
  mainInnerContainer: {
    flex: 1,
    flexDirection: "column",
    gap: 10,
  },
  leftInnerBox: {
    paddingHorizontal: 12,
    paddingVertical: 35,
    borderRadius: 5,
  },
  mainBoxInnerText: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  mainBoxInnerTextHighlight: {
    fontSize: 24,
    color: Color.pink900,
    fontWeight: "bold",
  },
  communityContainer: {
    width: "100%",
    padding: 21,
    height: 140,
    gap: 7,
  },
  communityTop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  communityBox: {
    width: "100%",
    height: 85,
    borderColor: Color.gray100,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "column",
    paddingHorizontal: 18,
    paddingVertical: 13,
    justifyContent: "space-between",
  },
  middleTitle: { color: "black", fontWeight: "bold", fontSize: 18 },
});
