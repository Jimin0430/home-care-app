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

export default function AspiringCaregiverHomeScreen() {
  const boxHeight = windowHeight * 0.48; // 화면 세로 길이의 40% 계산

  const handleSupportButton = () => {
    // 지원 버튼 클릭 시 처리할 내용
    console.log("지원 버튼 클릭됨");
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <ImageBackground
          source={require("../../assets/images/bannerImageForAspiringCaregiverHome.png")}
          style={styles.bannerImage}
          // resizeMode="cover"
        >
          <Text style={styles.bannerText}>
            요양사, 막연히 힘들고 고된 직업이 아닙니다
          </Text>
        </ImageBackground>

        <View style={styles.textContainer}>
          <Text style={styles.mainText}>
            N잡의 시대! {"\n"}요양 보호사로 나의 활동의 무대를 넓혀보세요.{"\n"}
            케어프렌즈는 당신을 위한 유연한 근무 조건을 제공할 것을
            약속드립니다.
          </Text>
          <Text style={styles.mainText}>
            초고령화 시대, 10년 이내 노인 비율 20% 증가
          </Text>
          <Text style={styles.mainText}>요양 보호사로의 시작을 함께합니다</Text>
          <Text style={styles.highlightText}>
            100% 무료! 자격증 응시료, 강의비 지원!
          </Text>
          {/* <Text style={styles.mainText}>
            자격증 취득 후, 케어프렌즈에 요양사로 등록하여 n회 이상 요양사
            활동을 할 것을 약속해야합니다.
          </Text> */}
        </View>

        <TouchableOpacity
          style={profileScreenStyle.bottomButton}
          onPress={handleSupportButton}
        >
          <Text style={profileScreenStyle.bottomButtonText}>
            요양사 자격증 취득 지원받기
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 8,
  },
  scrollViewContent: {
    flex: 1,
    alignItems: "center",
  },
  bannerImage: {
    width: "100%",
    minHeight: 250,
    resizeMode: "contain",
    // justifyContent: "flex-end",
  },
  bannerText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
  },
  textContainer: {
    paddingHorizontal: 18,
    paddingVertical: 20,
  },
  mainText: {
    fontSize: 16,
    color: "black",
    marginBottom: 10,
  },
  highlightText: {
    fontSize: 16,
    color: Color.pink700,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
