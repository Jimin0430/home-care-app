import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { signInScreenStyle } from "../../styles/globalStyles";
import { Color } from "../../styles/color";

const RelationshipPicker = ({ items, setItems, handleInputChange }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const onChangeValue = (value) => {
    setValue(value);
    handleInputChange("relationship_index", value);
  };

  return (
    <View>
      <DropDownPicker
        listMode="SCROLLVIEW"
        scrollViewProps={{
          nestedScrollEnabled: true,
        }}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        placeholder="환자와의 관계를 선택해주세요"
        onChangeValue={onChangeValue}
        style={signInScreenStyle.input}
        placeholderStyle={signInScreenStyle.boxInnerText}
        dropDownContainerStyle={styles.dropDownContainerStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    width: "100%",
  },
  dropDownContainerStyle: {
    width: "100%",
    backgroundColor: "#FBFBFB",
    borderColor: "#DFDFDF",
    borderRadius: 10,
    padding: 5,
  },
});

export default RelationshipPicker;
