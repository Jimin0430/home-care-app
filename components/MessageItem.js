// MessageItem.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MessageItem = ({ sender, receiver, content, timestamp }) => (
  <View style={styles.messageContainer}>
    <Text style={styles.senderReceiverText}>
      {sender} - {receiver}
    </Text>
    <Text style={styles.contentText}>{content}</Text>
    <Text style={styles.timestampText}>{timestamp}</Text>
  </View>
);

const styles = StyleSheet.create({
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

export default MessageItem;
