import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Color } from "../styles/color";

const MessageItem = ({
  currentUsername,
  sender,
  receiver,
  content,
  timestamp,
}) => {
  const displayName = sender === currentUsername ? receiver : sender;

  return (
    <View style={styles.messageContainer}>
      <View>
        <Ionicons name="person-circle" size={50} color={Color.pink900} />
      </View>
      <View style={styles.contextContainer}>
        <Text style={styles.senderReceiverText}>{displayName}</Text>
        <Text style={styles.contentText} numberOfLines={1} ellipsizeMode="tail">
          {content}
        </Text>
      </View>
      <Text style={styles.timestampText}>{timestamp}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    position: "relative",
    flex: 1,
    width: "100%",
    paddingTop: 17,
    paddingHorizontal: 15,
    paddingBottom: 10,
    borderTopWidth: 0,
    borderBottomWidth: 0.4,
    borderBottomColor: Color.gray500,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  contextContainer: {
    justifyContent: "center",
    width: "70%",
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
    position: "absolute",
    top: 10,
    right: 15,
    fontSize: 12,
    color: "#999",
  },
});

export default MessageItem;
