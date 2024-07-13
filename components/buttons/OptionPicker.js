import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { signInScreenStyle } from "../../styles/globalStyles";
import { Color } from "../../styles/color";

const SingleChoiceSelector = ({ options, formData, handleInputChange }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handlePress = (index) => {
    setSelectedOption(index);
    //api 수정 시 활성화
    // handleInputChange({
    //   ...formData,
    //   ["간병서비스 필요 정도"]: selectedOption,
    // });
  };

  return (
    <View style={styles.container}>
      {options &&
        options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              signInScreenStyle.input,
              selectedOption === index && styles.selectedButton,
            ]}
            onPress={() => handlePress(index)}
          >
            <Text style={signInScreenStyle.boxInnerText}>{option}</Text>
          </TouchableOpacity>
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
  selectedButton: {
    borderColor: Color.pink900,
    borderWidth: 1,
  },
  selectionText: {
    fontSize: 18,
    color: "#333",
  },
});

export default SingleChoiceSelector;
