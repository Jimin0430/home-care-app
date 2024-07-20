import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";
import axios from "axios";
import api from "../apis/api";

const API_URL = api.BASE_URL;

export default function MessageScreen() {
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    try {
      await axios.post(`${API_URL}/messages/`, { sender, receiver, content });
      setContent("");
      fetchMessages();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${API_URL}/messages/${receiver}`);
      setMessages(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (receiver) {
      fetchMessages();
    }
  }, [receiver]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Sender"
        value={sender}
        onChangeText={setSender}
      />
      <TextInput
        style={styles.input}
        placeholder="Receiver"
        value={receiver}
        onChangeText={setReceiver}
      />
      <TextInput
        style={styles.input}
        placeholder="Message"
        value={content}
        onChangeText={setContent}
      />
      <Button title="Send Message" onPress={sendMessage} />
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.message}>
            <Text>
              {item.sender}: {item.content}
            </Text>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
  },
  message: {
    padding: 10,
    borderBottomWidth: 1,
  },
  timestamp: {
    fontSize: 10,
    color: "gray",
  },
});
