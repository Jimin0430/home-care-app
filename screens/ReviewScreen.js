import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import { useRoute } from "@react-navigation/native";

import { Rating } from "react-native-ratings";
import Header from "../components/Header";
import { signInScreenStyle, profileEditStyle } from "../styles/globalStyles";
import { Color } from "../styles/color";
import { reviews } from "../utils/reviewDataForCaregiver";

const ReviewScreen = () => {
  const route = useRoute();
  const myReviewPage = route?.params?.myReviewPage ?? false;
  const fromPatientHome = route?.params?.fromPatientHome ?? false;
  const fromFindCaregiver = route?.params?.fromFindCaregiver ?? false;
  const isCaregiver = route?.params?.isCaregiver ?? false;
  const renderItem = ({ item }) => (
    <View style={styles.reviewContainer}>
      <View style={styles.topContainer}>
        <Image
          source={require("../assets/images/patientProfileImage.png")}
          style={styles.avatar}
        />
        <View style={styles.reviewContent}>
          <Text style={styles.username}>{item.username}</Text>
          <View style={styles.ratingContainer}>
            <Rating
              type="heart"
              ratingCount={5}
              imageSize={20}
              readonly
              startingValue={item.rating}
              style={styles.rating}
            />
          </View>
        </View>
      </View>

      <Text style={styles.review}>{item.review}</Text>
    </View>
  );

  console.log("fromFindCaregiver :", fromFindCaregiver);
  console.log("fromPatientHome : ", fromPatientHome);
  console.log("myReviewPage : ", myReviewPage);
  return (
    <SafeAreaView style={profileEditStyle.safeArea}>
      {/* fromFindCaregiver */}
      {/* fromPatientHome  */}
      {isCaregiver ? <Header title={"나의 리뷰 모아보기"} /> : null}
      {fromPatientHome || fromFindCaregiver ? <Header title={"후기"} /> : null}

      <View
        style={[
          signInScreenStyle.scrollViewContent,
          { flex: 1, paddingHorizontal: 30, paddingBottom: 10 },
        ]}
      >
        <FlatList
          data={reviews}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false} // 스크롤바 숨기기
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  reviewContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: Color.gray500,
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    resizeMode: "cover",
  },
  reviewContent: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "flex-start", // 왼쪽 정렬
    width: "100%",
  },
  rating: {
    marginVertical: 5,
  },
  review: {
    fontSize: 14,
    color: "#555",
  },
});

export default ReviewScreen;
