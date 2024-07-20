import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { profileEditStyle } from "../styles/globalStyles";
import { Color } from "../styles/color";

const SelectOneOfTwo = ({ leftButtonText, rightButtonText }) => {
  const [selectedType, setSelectedType] = useState("");

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.buttonContainer,
          { width: 140, alignItems: "center" },
          selectedType === leftButtonText && styles.selectedButton,
        ]}
        onPress={() => setSelectedType(leftButtonText)}
      >
        <Text
          style={[
            styles.buttonText,
            selectedType === leftButtonText && styles.selectedButtonText,
          ]}
        >
          {leftButtonText}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.buttonContainer,
          { width: 140, alignItems: "center" },
          selectedType === rightButtonText && styles.selectedButton,
        ]}
        onPress={() => setSelectedType(rightButtonText)}
      >
        <Text
          style={[
            styles.buttonText,
            selectedType === rightButtonText && styles.selectedButtonText,
          ]}
        >
          {rightButtonText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  buttonContainer: {
    backgroundColor: Color.gray200,
    color: Color.gray700,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 0,
    justifyContent: "center",
    alignItems: "Center",
    paddingVertical: 18,
    paddingHorizontal: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f2f2f2",
    alignItems: "center",
  },
  selectedButton: {
    borderColor: "#ff6b6b",
    borderWidth: 1,
    backgroundColor: "#ffe6e6",
  },
  buttonText: {
    fontSize: 16,
    color: "#333",
    alignSelf: "center",
  },
  selectedButtonText: {
    fontSize: 16,
    color: "#333",
  },
});

export default SelectOneOfTwo;
