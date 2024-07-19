import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import DropDownPicker from "react-native-dropdown-picker";
import moment from "moment";

import { Color } from "../../styles/color";
import { schedules } from "../../utils/patientScheduleData";

import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
const CaregiverSearchScreen = () => {
  const [openRegion, setOpenRegion] = useState(false);
  const [openTimeSlot, setOpenTimeSlot] = useState(false);
  const [openPeriod, setOpenPeriod] = useState(null);
  const [openGender, setOpenGender] = useState(null);
  const [valueRegion, setValueRegion] = useState(null);
  const [valueTimeSlot, setValueTimeSlot] = useState(null);
  const [valuePeriod, setValuePeriod] = useState(null);
  const [valueGender, setValueGender] = useState(null);
  const [selectedDate, setSelectedDate] = useState(""); // 초기 선택된 날짜
  const [filteredSchedules, setFilteredSchedules] = useState([]);

  useEffect(() => {
    console.log(selectedDate);
    if (selectedDate && schedules) {
      const filtered = schedules
        .filter((schedule) => schedule.date === selectedDate)
        .sort((a, b) => moment(a.time, "HH:mm") - moment(b.time, "HH:mm"));
      setFilteredSchedules(filtered);
    }
  }, [selectedDate, schedules]);

  const onDateSelected = (date) => {
    setSelectedDate(date.format("YYYY-MM-DD"));
  };

  const renderScheduleItem = ({ item }) => (
    <View style={styles.scheduleItem}>
      <Text style={styles.scheduleTime}>{item.time}</Text>
      <View style={styles.scheduleDetails}>
        <View style={styles.titleContainer}>
          <Text style={styles.scheduleTitle}>{item.title}</Text>
          {item.emergency && (
            <MaterialIcons name="emergency" size={15} color={Color.pink900} />
          )}
          {item.pills && (
            <MaterialCommunityIcons
              name="pill"
              size={15}
              color={Color.pink900}
            />
          )}
        </View>
        <Text style={styles.scheduleSubtext}>
          여 | 시급: {item.pay} | 종료: {item.duration}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <CalendarStrip
        scrollable
        style={styles.calendarStrip}
        calendarColor={"#FFF"}
        calendarHeaderStyle={{ color: "#fff" }}
        calendarHeaderFormat={""}
        dateNumberStyle={{ color: "#000" }}
        dateNameStyle={{ color: "#000" }}
        highlightDateNumberStyle={{ color: "#FFF" }}
        highlightDateNameStyle={{ color: "#FFF" }}
        highlightDateContainerStyle={{ backgroundColor: Color.pink900 }}
        onDateSelected={onDateSelected}
        selectedDate={selectedDate ? moment(selectedDate) : moment()}
        leftSelector={
          <AntDesign name="leftcircle" size={24} color={Color.pink700} />
        }
        rightSelector={
          <AntDesign name="rightcircle" size={24} color={Color.pink700} />
        }
      />
      <View style={styles.dropdownContainer}>
        <View style={styles.dropdownWrapper}>
          <DropDownPicker
            open={openPeriod}
            value={valuePeriod}
            items={[
              { label: "1개월 이내", value: "1-less-month" },
              { label: "1개월", value: "1month" },
              { label: "3개월", value: "3months" },
              { label: "6개월", value: "6months" },
              { label: "1년 이상", value: "over-1year" },
            ]}
            setOpen={setOpenPeriod}
            setValue={setValuePeriod}
            setItems={(items) => setItems({ ...items, region: items })}
            placeholder="요양 기간"
            style={[styles.dropdown, { minWidth: 100 }]}
            dropDownContainerStyle={styles.dropdownList}
            labelStyle={styles.dropdownLabel}
            placeholderStyle={styles.dropdownLabel}
            zIndex={3000}
            textStyle={styles.dropdownText}
            listMode="SCROLLVIEW"
            scrollViewProps={{ nestedScrollEnabled: true }}
          />
        </View>
        <View style={styles.dropdownWrapper}>
          <DropDownPicker
            open={openGender}
            value={valueGender}
            items={[
              { label: "여성", value: "female" },
              { label: "남성", value: "male" },
            ]}
            setOpen={setOpenGender}
            setValue={setValueGender}
            setItems={(items) => setItems({ ...items, region: items })}
            placeholder="성별"
            style={[styles.dropdown, { height: 10 }]}
            dropDownContainerStyle={styles.dropdownList}
            labelStyle={styles.dropdownLabel}
            placeholderStyle={styles.dropdownLabel}
            zIndex={3000}
            textStyle={styles.dropdownText}
            mode="BADGE"
            listMode="SCROLLVIEW"
            scrollViewProps={{ nestedScrollEnabled: true }}
          />
        </View>
        <View style={styles.dropdownWrapper}>
          <DropDownPicker
            open={openRegion}
            value={valueRegion}
            items={[
              { label: "서울", value: "seoul" },
              { label: "경기", value: "gyeonggi" },
              { label: "인천", value: "incheon" },
            ]}
            setOpen={setOpenRegion}
            setValue={setValueRegion}
            setItems={(items) => setItems({ ...items, region: items })}
            placeholder="지역"
            style={[styles.dropdown, { height: 10 }]}
            dropDownContainerStyle={styles.dropdownList}
            labelStyle={styles.dropdownLabel}
            placeholderStyle={styles.dropdownLabel}
            zIndex={3000}
            textStyle={styles.dropdownText}
            mode="BADGE"
            listMode="SCROLLVIEW"
            scrollViewProps={{ nestedScrollEnabled: true }}
          />
        </View>
        <View style={styles.dropdownWrapper}>
          <DropDownPicker
            open={openTimeSlot}
            value={valueTimeSlot}
            items={[
              { label: "오전", value: "morning" },
              { label: "오후", value: "afternoon" },
              { label: "저녁", value: "evening" },
            ]}
            setOpen={setOpenTimeSlot}
            setValue={setValueTimeSlot}
            setItems={(items) => setItems({ ...items, timeSlot: items })}
            placeholder="시간대"
            style={[styles.dropdown, { height: 10 }]}
            dropDownContainerStyle={styles.dropdownList}
            labelStyle={styles.dropdownLabel}
            placeholderStyle={styles.dropdownLabel}
            zIndex={2000}
            textStyle={styles.dropdownText}
            mode="BADGE"
            listMode="SCROLLVIEW"
            scrollViewProps={{ nestedScrollEnabled: true }}
          />
        </View>
      </View>
      <FlatList
        data={filteredSchedules}
        renderItem={renderScheduleItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.scheduleList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "column",
    width: "100%",
  },
  calendarStrip: {
    height: 100,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  dropdownContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
    zIndex: 3000, // Ensure the dropdowns appear above other components
  },
  dropdownWrapper: {
    alignSelf: "flex-start",
    // zIndex: 3000, // Ensure each wrapper has its own stacking context
    marginRight: 10, // Adjust spacing between the dropdowns
  },
  dropdown: {
    backgroundColor: Color.gray200,
    borderWidth: 0,
    minHeight: 32,
    minWidth: 85,
  },
  dropdownList: {
    backgroundColor: Color.gray200,
    borderWidth: 0,
  },
  dropdownLabel: {
    fontWeight: "bold",
    fontSize: 12,
    color: Color.gray900,
  },
  dropdownText: {
    fontSize: 12, // Adjusted for smaller font size
    fontWeight: "bold",
    color: Color.gray900,
    lineHeight: 15, // Ensuring the text is vertically centered
  },
  scheduleList: {
    flex: 1,
    paddingHorizontal: 30,
    marginTop: 10,
  },
  scheduleItem: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  scheduleTime: {
    flex: 1.2,
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "semibold",
    marginRight: 10,
  },
  scheduleDetails: {
    flex: 5,
    flexDirection: "column",
  },
  titleContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
  },
  scheduleSubtext: {
    fontSize: 14,
    color: "gray",
  },
  icon: {
    marginLeft: 5,
  },
});

export default CaregiverSearchScreen;
