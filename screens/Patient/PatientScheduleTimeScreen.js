import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  NativeModules,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Calendar } from "react-native-calendars";
import { profileEditStyle, signInScreenStyle } from "../../styles/globalStyles";
import FixedCareDays from "../../components/FixedCareDays";
import Header from "../../components/Header";

export default function PatientScheduleTimeScreen({ navigation }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [timeStart, setTimeStart] = useState(new Date());
  const [timeEnd, setTimeEnd] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showTimeStartPicker, setShowTimeStartPicker] = useState(false);
  const [showTimeEndPicker, setShowTimeEndPicker] = useState(false);
  const [selectedDates, setSelectedDates] = useState({});
  const { StatusBarManager } = NativeModules;

  useEffect(() => {
    Platform.OS == "ios"
      ? StatusBarManager.getHeight((statusBarFrameData) => {
          setStatusBarHeight(statusBarFrameData.height);
        })
      : null;
  }, []);

  const [statusBarHeight, setStatusBarHeight] = useState(0);

  const handleDayPress = (day) => {
    const newSelectedDates = {
      ...selectedDates,
      [day.dateString]: { selected: true },
    };
    setSelectedDates(newSelectedDates);
  };

  const onChangeStartDate = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(Platform.OS === "ios");
    setStartDate(currentDate);
  };

  const onChangeEndDate = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(Platform.OS === "ios");
    setEndDate(currentDate);
  };

  const onChangeTimeStart = (event, selectedDate) => {
    const currentTime = selectedDate || timeStart;
    setShowTimeStartPicker(Platform.OS === "ios");
    setTimeStart(currentTime);
  };

  const onChangeTimeEnd = (event, selectedDate) => {
    const currentTime = selectedDate || timeEnd;
    setShowTimeEndPicker(Platform.OS === "ios");
    setTimeEnd(currentTime);
  };

  const handleCompleteButton = () => {
    navigation.navigate("PatientScheduleNoteScreen");
  };
  return (
    <SafeAreaView style={profileEditStyle.safeArea}>
      <Header title={"일정 관리하기"} />

      <KeyboardAvoidingView
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[signInScreenStyle.keyboardPush, { flexGrow: 1 }]}
        keyboardVerticalOffset={statusBarHeight + 44}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={[
              signInScreenStyle.scrollViewContent,
              { flexGrow: 1 },
            ]}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <View style={profileEditStyle.container}>
              <Text style={profileEditStyle.title}>
                간병 시간과 위치를 입력해주세요
              </Text>
              <View style={profileEditStyle.inputContainer}>
                <Text style={signInScreenStyle.subTitle}>간병 시작일</Text>
                <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
                  <TextInput
                    style={profileEditStyle.input}
                    placeholder="간병 시작일을 선택해주세요"
                    value={startDate.toDateString()}
                    editable={false}
                  />
                </TouchableOpacity>
                {showStartDatePicker && (
                  <DateTimePicker
                    value={startDate}
                    mode="date"
                    display="default"
                    onChange={onChangeStartDate}
                  />
                )}
              </View>
              <View style={profileEditStyle.inputContainer}>
                <Text style={signInScreenStyle.subTitle}>간병 종료일</Text>
                <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
                  <TextInput
                    style={profileEditStyle.input}
                    placeholder="간병 종료일을 선택해주세요"
                    value={endDate.toDateString()}
                    editable={false}
                  />
                </TouchableOpacity>
                {showEndDatePicker && (
                  <DateTimePicker
                    value={endDate}
                    mode="date"
                    display="default"
                    onChange={onChangeEndDate}
                  />
                )}
              </View>
              <FixedCareDays />
              <View style={profileEditStyle.inputContainer}>
                <Text style={signInScreenStyle.subTitle}>고정 간병 시간</Text>
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
                    />
                  )}
                </View>
              </View>
              <View style={profileEditStyle.inputContainer}>
                <Text style={signInScreenStyle.subTitle}>추가 간병일</Text>
                <Calendar
                  onDayPress={handleDayPress}
                  markedDates={selectedDates}
                  markingType={"simple"}
                />
              </View>
              <View style={profileEditStyle.inputContainer}>
                <Text style={signInScreenStyle.subTitle}>
                  집 주소 (간병 위치)
                </Text>
                <TextInput
                  style={profileEditStyle.input}
                  placeholder="건물명, 동/호수 등의 상세주소 입력"
                />
              </View>
              <TouchableOpacity
                style={signInScreenStyle.button}
                onPress={() => handleCompleteButton()}
              >
                <Text style={signInScreenStyle.buttonText}>다음</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
