import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import axios from "axios";
import api from "../apis/api";
import MessageItem from "../components/MessageItem";

const API_URL = api.BASE_URL;

const messages = [
  {
    sender: "미추홀 입동 요양사",
    receiver: "current_username",
    content: "안녕하세요. 프로필 보고 연락드립니다. 함께 근무해요.",
    timestamp: "3일 전",
  },
  {
    sender: "안천헬렌켈러",
    receiver: "current_username",
    content: "안녕하세요. 프로필 보고 연락드립니다. 함께 근무해요.",
    timestamp: "3일 전",
  },
  {
    sender: "부평헬렌켈러",
    receiver: "current_username",
    content: "안녕하세요. 프로필 보고 연락드립니다. 함께 근무해요.",
    timestamp: "3일 전",
  },
];

export default function ChatScreen({ route }) {
  const [messageList, setMessageList] = useState(messages);
  const username = "current_username"; // 현재 로그인된 사용자 이름을 여기에 설정

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${API_URL}/messages/inbox/${username}`);
      setMessages(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // fetchMessages();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <MessageItem
            sender={item.sender}
            receiver={item.receiver}
            content={item.content}
            timestamp={item.timestamp}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  messageContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  senderReceiverText: {
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
  },
});
