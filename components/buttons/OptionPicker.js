import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { signInScreenStyle } from "../../styles/globalStyles";
import { Color } from "../../styles/color";

const SingleChoiceSelector = ({ options, formData, handleInputChange }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handlePress = (index) => {
    setSelectedOption(index);
    //api 수정 시 활성화
    handleInputChange("service_urgency_index", index);
  };

  return (
    <View style={styles.container}>
      {options &&
        options.map((option, index) => (
          <View key={index} style={styles.optionContainer}>
            <TouchableOpacity
              style={[
                signInScreenStyle.input,
                selectedOption === index && styles.selectedButton,
              ]}
              onPress={() => handlePress(index)}
            >
              <Text
                style={
                  selectedOption === index
                    ? styles.selectionText
                    : signInScreenStyle.boxInnerText
                }
              >
                {option}
              </Text>
            </TouchableOpacity>
            {selectedOption === index && <View style={styles.overlay} />}
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 9,
  },
  optionContainer: {
    // position: "relative",
    flex: 1,
    width: "100%",
  },
  selectedButton: {
    borderColor: Color.pink900,
    borderWidth: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Color.pink900,
    opacity: 0.1,
    borderRadius: 10,
  },
  selectionText: {
    fontSize: 16,
    color: "#333",
  },
});

export default SingleChoiceSelector;
