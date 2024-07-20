import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Rating } from "@kolking/react-native-rating";

const ReviewItem = ({ reviewer, content, rating, timestamp }) => {
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewHeader}>
        <Image
          source={require("../assets/images/profile.png")} // 리뷰어 프로필 이미지 경로 설정
          style={styles.profileImage}
        />
        <View style={styles.reviewerInfo}>
          <Text style={styles.reviewerName}>{reviewer}</Text>
          <Rating
            rated={rating}
            totalCount={5}
            size={16}
            type="custom"
            selectedIconImage={require("../assets/images/heart_filled.png")} // 채워진 하트 이미지 경로 설정
            unselectedIconImage={require("../assets/images/heart_empty.png")} // 빈 하트 이미지 경로 설정
          />
        </View>
      </View>
      <Text style={styles.contentText}>{content}</Text>
      <Text style={styles.timestampText}>{timestamp}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  reviewerInfo: {
    flexDirection: "column",
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  contentText: {
    fontSize: 14,
    color: "#555",
  },
  timestampText: {
    fontSize: 12,
    color: "#999",
    textAlign: "right",
    marginTop: 10,
  },
});

export default ReviewItem;
