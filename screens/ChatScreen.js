import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { profileEditStyle } from "../styles/globalStyles";
import Header from "../components/Header";
import { Color } from "../styles/color";
import {
  sendMessage,
  getMessageBySender,
  getMessageByReceiver,
} from "../apis/chatApi";

const ChatScreen = ({ route }) => {
  const { sender, receiver } = route.params;
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const sentMessages = await getMessageBySender(sender);
        const receivedMessages = await getMessageByReceiver(sender);
        const allMessages = [...sentMessages, ...receivedMessages]
          .filter(
            (message) =>
              (message.sender_username === sender &&
                message.receiver_username === receiver) ||
              (message.sender_username === receiver &&
                message.receiver_username === sender)
          )
          .sort((a, b) => new Date(a.sent_at) - new Date(b.sent_at)); // sent_at 기준으로 정렬
        setMessages(allMessages);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    fetchMessages();
  }, [sender, receiver]);

  const sendMessageHandler = async () => {
    if (inputMessage.trim()) {
      const messageInfo = {
        sender_username: sender,
        receiver_username: receiver,
        content: inputMessage,
      };
      try {
        await sendMessage(messageInfo);
        const newMessage = {
          id: Date.now().toString(), // 고유 ID 생성
          sender_username: sender,
          receiver_username: receiver,
          content: inputMessage,
          sent_at: new Date().toISOString(), // 현재 시간으로 sent_at 설정
        };
        setMessages((prevMessages) =>
          [...prevMessages, newMessage].sort(
            (a, b) => new Date(a.sent_at) - new Date(b.sent_at)
          )
        ); // 새로운 메시지를 추가하고 sent_at 기준으로 정렬
        setInputMessage("");
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender_username === sender ? styles.sender : styles.receiver,
      ]}
    >
      <Text
        style={[
          styles.messageText,
          item.sender_username === sender
            ? styles.senderText
            : styles.receiverText,
        ]}
      >
        {item.content}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={profileEditStyle.safeArea}>
      <Header title={receiver} />
      <View style={styles.container}>
        <FlatList
          data={messages}
          keyExtractor={(item, index) =>
            item.id ? item.id.toString() : `${index}-${item.sent_at}`
          } // 메시지의 고유 id 사용
          renderItem={renderItem}
          contentContainerStyle={styles.messageList}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputMessage}
            onChangeText={setInputMessage}
            placeholder="메시지를 입력하세요..."
            onSubmitEditing={sendMessageHandler}
          />
          <TouchableOpacity
            onPress={sendMessageHandler}
            style={styles.sendButton}
          >
            <Text style={styles.sendButtonText}>전송</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(1,110,79,0.4)",
  },
  messageList: {
    padding: 10,
  },
  messageContainer: {
    marginVertical: 6,
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 30,
    maxWidth: "80%",
  },
  sender: {
    alignSelf: "flex-end",
    backgroundColor: "#2A2D34",
  },
  receiver: {
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
  },
  senderText: {
    color: "#fff",
  },
  receiverText: {
    color: "#000",
  },
  messageText: {
    fontSize: 15,
  },
  inputContainer: {
    flexDirection: "row",
    height: 75,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 0.5,
    borderColor: Color.gray500,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: Color.gray200,
    color: Color.gray700,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 0,
    justifyContent: "center",
    paddingVertical: 18,
    paddingHorizontal: 16,
  },
  sendButton: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: Color.pink800,
    marginVertical: 5,
    borderRadius: 10,
  },
  sendButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ChatScreen;
