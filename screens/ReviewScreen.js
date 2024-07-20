// ReviewScreen.js
import React from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";

const reviews = [
  {
    id: "1",
    username: "사용자 닉네임",
    rating: "★★★★★",
    review:
      "후기 후기 후기 후기 후기 후기 후기 후기 후기 후기 후기 후기 후기 ...",
    avatar: "https://via.placeholder.com/50", // Placeholder 이미지 URL
  },
  {
    id: "2",
    username: "사용자 닉네임",
    rating: "★★★★★",
    review:
      "후기 후기 후기 후기 후기 후기 후기 후기 후기 후기 후기 후기 후기 ...",
    avatar: "https://via.placeholder.com/50",
  },
  // 추가 리뷰 항목들
];

const ReviewScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.reviewContainer}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.reviewContent}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.rating}>{item.rating}</Text>
        <Text style={styles.review}>{item.review}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  reviewContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  reviewContent: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
  },
  rating: {
    fontSize: 14,
    color: "red",
  },
  review: {
    fontSize: 14,
    color: "#555",
  },
});

export default ReviewScreen;
