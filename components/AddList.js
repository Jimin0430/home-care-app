import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { profileEditStyle, signInScreenStyle } from "../styles/globalStyles";
import { Color } from "../styles/color";

export default function MedicationList({ title, placeholder }) {
  const [item, setItem] = useState([]);
  const [itemName, setItemName] = useState("");

  const addItems = () => {
    if (itemName.trim()) {
      setItem([...item, itemName.trim()]);
      setItemName("");
    }
  };

  const removeMedication = (name) => {
    setItem(item.filter((med) => med !== name));
  };

  return (
    <View style={profileEditStyle.inputContainer}>
      <Text style={signInScreenStyle.subTitle}>{title}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={itemName}
          onChangeText={setItemName}
        />
        <TouchableOpacity style={styles.addButton} onPress={addItems}>
          <Ionicons name="add" size={20} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.itemList}>
        {item.map((item, index) => (
          <View key={index.toString()} style={styles.itemContainer}>
            <Text style={styles.itemText}>{item}</Text>
            <TouchableOpacity onPress={() => removeMedication(item)}>
              <Ionicons name="close-circle" size={20} color={Color.gray500} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: Color.gray200,
    color: Color.gray700,
    fontSize: 16,
    borderWidth: 0,
    justifyContent: "center",
    paddingVertical: 18,
    paddingHorizontal: 16,
  },
  addButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: Color.pink700,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  itemList: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom: 5,
    borderBottomWidth: 1, // 왼쪽에만 border 적용
    borderBottomColor: Color.gray100, // border 색상
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    margin: 5,
    borderWidth: 0.5,
    borderColor: Color.gray500,
    height: 40,
    borderRadius: 50,
  },
  itemText: {
    marginRight: 5,
  },
});
