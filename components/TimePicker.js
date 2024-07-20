import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { profileEditStyle } from "../styles/globalStyles";

const TimePicker = ({
  timeStart,
  timeEnd,
  onChangeTimeStart,
  onChangeTimeEnd,
  showTimeStartPicker,
  setShowTimeStartPicker,
  showTimeEndPicker,
  setShowTimeEndPicker,
}) => {
  return (
    <View style={profileEditStyle.timeContainer}>
      <TouchableOpacity
        onPress={() => setShowTimeStartPicker(true)}
        style={profileEditStyle.selectTimeContainer}
      >
        <TextInput
          style={profileEditStyle.selectTimeInput}
          placeholder="시작 시간을 선택해주세요"
          value={timeStart.toLocaleTimeString()}
          editable={false}
        />
      </TouchableOpacity>
      {showTimeStartPicker && (
        <DateTimePicker
          value={timeStart}
          mode="time"
          display="spinner"
          onChange={onChangeTimeStart}
          locale="ko"
        />
      )}
      <Text style={{ fontSize: 20, fontWeight: "700" }}> ~ </Text>
      <TouchableOpacity
        onPress={() => setShowTimeEndPicker(true)}
        style={profileEditStyle.selectTimeContainer}
      >
        <TextInput
          style={profileEditStyle.selectTimeInput}
          placeholder="종료 시간을 선택해주세요"
          value={timeEnd.toLocaleTimeString()}
          editable={false}
        />
      </TouchableOpacity>
      {showTimeEndPicker && (
        <DateTimePicker
          value={timeEnd}
          mode="time"
          display="spinner"
          onChange={onChangeTimeEnd}
          locale="ko"
        />
      )}
    </View>
  );
};

export default TimePicker;
