import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { getUserName } from "../utils/storage";
import { getMessageBySender, getMessageByReceiver } from "../apis/chatApi";
import MessageItem from "../components/MessageItem";

const ChatListScreen = () => {
  const [messageList, setMessageList] = useState([]);
  const [username, setUsername] = useState("");

  const navigation = useNavigation();

  const fetchUserName = async () => {
    try {
      const getName = await getUserName();
      setUsername(getName || "");
    } catch (e) {
      console.log(e);
    }
  };

  const fetchMessages = async () => {
    if (!username) return;
    try {
      const sentMessages = await getMessageBySender(username);
      const receivedMessages = await getMessageByReceiver(username);
      const allMessages = [...sentMessages, ...receivedMessages].map(
        (message) => ({
          ...message,
          type: message.sender_username === username ? "sender" : "receiver",
        })
      );

      const groupedMessages = allMessages.reduce((acc, message) => {
        const key =
          message.sender_username === username
            ? message.receiver_username
            : message.sender_username;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(message);
        return acc;
      }, {});

      const lastMessages = Object.keys(groupedMessages).map((key) => {
        const messages = groupedMessages[key];
        return messages.sort(
          (a, b) => new Date(b.sent_at) - new Date(a.sent_at)
        )[0]; // sent_at 기준으로 최신 메시지 가져오기
      });

      setMessageList(lastMessages);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  useEffect(() => {
    fetchUserName();
  }, []);

  useEffect(() => {
    if (username !== "" && username !== undefined) {
      fetchMessages();
    }
  }, [username]);

  const handlePress = (item) => {
    navigation.navigate("ChatScreen", {
      sender: username,
      receiver:
        item.sender_username === username
          ? item.receiver_username
          : item.sender_username,
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messageList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item)}>
            <MessageItem
              currentUsername={username}
              sender={item.sender_username}
              receiver={item.receiver_username}
              content={item.content}
              timestamp={item.sent_at}
              type={item.type} // 추가된 type 값 전달
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "#fff",
  },
});

export default ChatListScreen;
