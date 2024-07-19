import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import moment from "moment";
import { Color } from "../../styles/color";
import { schedules } from "../../utils/patientScheduleData";

import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

// Generate random caregiver data
const generateCaregivers = () => {
  const names = ["헬렌켈러", "마리퀴리", "플로렌스", "나이팅게일"];
  const caregivers = [];
  for (let i = 0; i < 10; i++) {
    const randomName = names[Math.floor(Math.random() * names.length)];
    caregivers.push({
      id: i,
      name: `부평 ${randomName}`,
      intro: "내 가족처럼 돌보는 요양사입니다.",
      pay: 12000,
      gender: "성별 : 여자",
      careerCheck: Math.random() < 0.5, // 경력 체크 상태를 나타내는 불리언 값으로, 50% 확률로 true입니다.
      certified: Math.random() < 0.8, // 자격증 상태를 나타내는 불리언 값으로, 80% 확률로 true입니다.
    });
  }
  return caregivers;
};

const caregiversData = generateCaregivers();

const PatientSearchCaregiver = () => {
  const [openCareType, setOpenCareType] = useState(false);
  const [openRegion, setOpenRegion] = useState(false);
  const [openTimeSlot, setOpenTimeSlot] = useState(false);
  const [openPeriod, setOpenPeriod] = useState(null);
  const [openGender, setOpenGender] = useState(null);
  const [valueCareType, setValueCareType] = useState(null);
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

  const renderCaregiverItem = ({ item }) => (
    <View style={styles.caregiverItem}>
      <View style={styles.leftShadow} />
      <Image
        source={require("../../assets/images/caregiverProfileImage.png")}
        style={styles.avatarText}
      />
      <View style={styles.infoContainer}>
        <View style={styles.caregiverHeader}>
          <View style={styles.caregiverInfo}>
            <Text style={styles.caregiverName}>{item.name}</Text>
            <View style={styles.iconContainer}>
              {item.certified && (
                <MaterialCommunityIcons
                  name="check-decagram"
                  size={17}
                  color={Color.pink900}
                />
              )}
              {item.careerCheck && (
                <AntDesign name="checksquare" size={17} color={Color.grin500} />
              )}
            </View>
          </View>
          <Text style={styles.caregiverIntro}>{item.intro}</Text>
        </View>

        <View style={styles.caregiverDetails}>
          <Text style={styles.caregiverDescription}>
            희망 시급: {item.pay}원
          </Text>
          <Text style={styles.caregiverDescription}>{item.gender}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.dropdownContainer}>
        <TouchableOpacity style={styles.searchBackground}>
          <FontAwesome
            name="search"
            size={20}
            color={Color.gray700}
            style={styles.searchIcon}
          />
        </TouchableOpacity>

        <View style={styles.dropdownWrapper}>
          <DropDownPicker
            open={openPeriod}
            value={valuePeriod}
            items={[
              { label: "신입", value: "newcomer" },
              { label: "1년차", value: "one_year" },
              { label: "2년차", value: "two_year" },
              { label: "3년차", value: "three_year" },
              { label: "4년차 이상", value: "four_plus_year" },
            ]}
            setOpen={setOpenPeriod}
            setValue={setValuePeriod}
            setItems={(items) => setItems({ ...items, region: items })}
            placeholder="경력사항"
            style={[styles.dropdown, { minWidth: 100 }]}
            dropDownContainerStyle={styles.dropdownList}
            labelStyle={styles.dropdownLabel}
            placeholderStyle={styles.dropdownLabel}
            zIndex={3000}
            textStyle={styles.dropdownText}
            // mode="BADGE"
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
              { label: "최저 시급", value: "lowest" },
              { label: "11,000원 이하", value: "under_11000" },
              { label: "12,000원 이하", value: "under_12000" },
              { label: "13,000원 이하", value: "under_13000" },
              { label: "13,000원 이상", value: "above_13000" },
            ]}
            setOpen={setOpenRegion}
            setValue={setValueRegion}
            setItems={(items) => setItems({ ...items, region: items })}
            placeholder="시급 범위"
            style={[styles.dropdown, { height: 10, minWidth: 100 }]}
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
      </View>

      <FlatList
        data={caregiversData}
        renderItem={renderCaregiverItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.caregiverList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 20,
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
  searchBackground: {
    position: "relative",
    backgroundColor: Color.gray200,
    height: 32,
    width: 32,
    borderRadius: 5,
    marginRight: 10,
  },
  searchIcon: {
    position: "absolute",
    top: 3,
    right: 7,
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
    color: Color.gray700,
  },
  dropdownText: {
    fontSize: 12, // Adjusted for smaller font size
    fontWeight: "bold",
    color: Color.gray700,
    lineHeight: 15, // Ensuring the text is vertically centered
  },
  caregiverItem: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginVertical: 15,
    borderRadius: 20,
    gap: 28,
  },
  infoContainer: {
    flex: 2,
    flexDirection: "column",
  },
  caregiverHeader: {
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: 10,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ff9999",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  avatarText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    resizeMode: "contain",
  },
  caregiverInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  caregiverName: {
    fontSize: 16,
    fontWeight: "bold",
    color: Color.gray900,
  },
  caregiverIntro: {
    fontSize: 14,
    color: Color.gray700,
  },
  caregiverDetails: {
    flexDirection: "column",
  },
  caregiverDescription: {
    fontSize: 13,
    color: Color.gray700,
    marginBottom: 2,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  icon: {
    marginLeft: 5,
  },
  leftShadow: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 0.5,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    shadowColor: "#000",
    shadowOffset: {
      width: -10,
      height: 0,
    },
    elevation: 5,
  },
  caregiverList: {
    marginTop: 20,
  },
});

export default PatientSearchCaregiver;
