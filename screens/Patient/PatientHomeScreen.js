import React from "react";
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Color } from "../../styles/color";
import { profileScreenStyle } from "../../styles/globalStyles";

const windowHeight = Dimensions.get("window").height;

export default function PatientHomeScreen({ navigation }) {
  const boxHeight = windowHeight * 0.48; // 화면 세로 길이의 40% 계산
  const review = {
    title: "후기",
    type: "review",
    data: [
      "요양사 선생님의 식사 보조 덕분에 어머니의 영양 상태가 많이 좋아졌습니다. 항상 친절하고 꼼꼼하게 돌봐주셔서 정말 감사합니다.",
      "할머니를 정성껏 돌봐주셔서 감사합니다. 특히 운동 보조를 해주신 덕분에 할머니의 근력이 조금씩 좋아지고 있어요. 앞으로도 잘 부탁드립니다.",
      "어르신들을 대하는 태도가 정말 훌륭하십니다. 항상 밝은 미소로 대해주시고, 꼼꼼하게 케어해주셔서 가족들도 안심하고 맡길 수 있었습니다.",
      " 항상 밝은 미소로 대해주시고, 꼼꼼하게 케어해주셔서 가족들도 안심하고 맡길 수 있었습니다.",
    ],
  };

  const checkGradeProfit = () => {};

  const moveScheduleManagement = () => {
    navigation.navigate("PatientScheduleTimeScreen");
  };
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
            <Text style={styles.bannerText}>요양사 찾기</Text>
          </ImageBackground>
        </View>

        <View style={[styles.homeMainContainer, { height: boxHeight }]}>
          <View style={styles.mainInnerContainer}>
            <TouchableOpacity
              style={[
                styles.leftInnerBox,
                { flex: 3, backgroundColor: Color.pink700 },
              ]}
              onPress={() => checkGradeProfit()}
            >
              <Text style={styles.mainBoxInnerText}>
                장기요양{"\n"}등급 혜택{"\n"}확인하기
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.leftInnerBox,
                { flex: 2, backgroundColor: Color.pink400 },
              ]}
              onPress={() => moveScheduleManagement()}
            >
              <Text style={styles.mainBoxInnerTextHighlight}>
                일정{"\n"}관리하기
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.mainInnerContainer}>
            <TouchableOpacity
              style={[
                styles.leftInnerBox,
                { flex: 1.1, backgroundColor: Color.grin600 },
              ]}
            >
              <Text style={styles.mainBoxInnerText}>
                나의 리뷰 {"\n"}작성하기
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.leftInnerBox,
                { flex: 2, backgroundColor: Color.grin500 },
              ]}
            >
              <Text style={styles.mainBoxInnerText}>
                관련{"\n"}뉴스 기사{"\n"}살펴보기
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.reviewContainer}>
          <View style={styles.communityTop}>
            <Text style={styles.middleTitle}>후기</Text>
            <Text style={styles.middleText}>더보기 {">"}</Text>
          </View>
          <View style={profileScreenStyle.sectionInfo}>
            {review.data.slice(0, 3).map((review, reviewIndex) => (
              <Text
                key={reviewIndex}
                style={styles.reviewText}
                numberOfLines={1} //한줄 넘어가면 ellipsizeMode 처리
                ellipsizeMode="tail" // ...으로 표시하도록 힘
              >
                {review}
              </Text>
            ))}
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
    // backgroundColor: "black",
  },
  mainBoxInnerText: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    height: "100%",
  },
  mainBoxInnerTextHighlight: {
    fontSize: 24,
    color: Color.pink900,
    fontWeight: "bold",
    height: "100%",
  },
  reviewContainer: {
    width: "100%",
    marginTop: 10,
    padding: 21,
    gap: 20,
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
  reviewText: {
    flex: 1,
    color: Color.gray800,
    fontWeight: "500",
    paddingHorizontal: 5,
  },
});
