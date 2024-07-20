import React from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView } from "react-native";
import Header from "../components/Header";
import { signInScreenStyle, profileEditStyle } from "../styles/globalStyles";
import { Color } from "../styles/color";
import posts from "../utils/caregiverCommunityPostData";

const CommunityPostScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.postContainer}>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postLocation}>{item.location}</Text>
      <Text style={styles.postContent} numberOfLines={2} ellipsizeMode="tail">
        {item.content}
      </Text>
      <View style={styles.postFooter}>
        <Text style={styles.postDate}>{item.date}</Text>
        <Text style={styles.postComments}>답변수 {item.comments}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={profileEditStyle.safeArea}>
      <Header title={"커뮤니티 글"} />
      <View
        style={[
          signInScreenStyle.scrollViewContent,
          { flex: 1, paddingHorizontal: 20, paddingBottom: 10 },
        ]}
      >
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false} // Hide the scrollbar
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: Color.gray500,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  postLocation: {
    fontSize: 14,
    color: "#777",
    marginVertical: 5,
  },
  postContent: {
    fontSize: 14,
    color: "#555",
  },
  postFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  postDate: {
    fontSize: 12,
    color: "#999",
  },
  postComments: {
    fontSize: 12,
    color: "#999",
  },
});

export default CommunityPostScreen;
