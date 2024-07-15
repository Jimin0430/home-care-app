import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SearchScreen = () => {
  const [selectedDate, setSelectedDate] = useState(2); // 초기 선택된 날짜

  const dates = [
    { day: 29, weekday: "토" },
    { day: 30, weekday: "일" },
    { day: 1, weekday: "월" },
    { day: 2, weekday: "화" },
    { day: 3, weekday: "수" },
    { day: 4, weekday: "목" },
    { day: 5, weekday: "금" },
  ];

  const schedules = [
    {
      time: "7:00",
      title: "고양시 순찰씨",
      pay: "20,000원",
      duration: "오후 5시",
    },
    {
      time: "7:00",
      title: "고양시 순찰씨",
      pay: "15,000원",
      duration: "오전 11시",
    },
    {
      time: "8:20",
      title: "고양시 순찰씨",
      pay: "15,000원",
      duration: "오후 5시 30분",
    },
    {
      time: "9:00",
      title: "고양시 순찰씨",
      pay: "25,000원",
      duration: "오후 5시",
    },
    {
      time: "10:00",
      title: "고양시 순찰씨",
      pay: "10,000원",
      duration: "오후 9시",
    },
    {
      time: "10:00",
      title: "고양시 순찰씨",
      pay: "35,000원",
      duration: "오전 12시",
    },
    {
      time: "10:00",
      title: "고양시 순찰씨",
      pay: "10,000원",
      duration: "오후 2시",
    },
    {
      time: "10:45",
      title: "고양시 순찰씨",
      pay: "40,000원",
      duration: "오후 4시",
    },
    {
      time: "14:00",
      title: "고양시 순찰씨",
      pay: "25,000원",
      duration: "오후 5시",
    },
    { time: "16:00", title: "고양시 순찰씨", pay: "", duration: "" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>환자 찾기</Text>
        <TouchableOpacity>
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.dateScroll}
      >
        {dates.map((date, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dateItem,
              selectedDate === date.day && styles.selectedDateItem,
            ]}
            onPress={() => setSelectedDate(date.day)}
          >
            <Text
              style={[
                styles.dateDay,
                selectedDate === date.day && styles.selectedDateText,
              ]}
            >
              {date.day}
            </Text>
            <Text
              style={[
                styles.dateWeekday,
                selectedDate === date.day && styles.selectedDateText,
              ]}
            >
              {date.weekday}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.filterContainer}>
        <Text style={styles.filterText}>요양 정기 가정</Text>
        <Text style={styles.filterText}>지역</Text>
        <Text style={styles.filterText}>시간대</Text>
      </View>

      <FlatList
        data={schedules}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.scheduleItem}>
            <Text style={styles.scheduleTime}>{item.time}</Text>
            <View style={styles.scheduleDetails}>
              <Text style={styles.scheduleTitle}>{item.title}</Text>
              <Text style={styles.scheduleSubtext}>
                여 | 시급: {item.pay} | 종료: {item.duration}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  dateScroll: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  dateItem: {
    alignItems: "center",
    marginHorizontal: 10,
    paddingVertical: 5,
  },
  selectedDateItem: {
    backgroundColor: "red",
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  dateDay: {
    fontSize: 18,
    fontWeight: "bold",
  },
  dateWeekday: {
    fontSize: 14,
  },
  selectedDateText: {
    color: "white",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  filterText: {
    fontSize: 14,
    color: "gray",
  },
  scheduleItem: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  scheduleTime: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 15,
  },
  scheduleDetails: {
    flex: 1,
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  scheduleSubtext: {
    fontSize: 14,
    color: "gray",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingVertical: 10,
  },
  tabItem: {
    alignItems: "center",
  },
});

export default SearchScreen;
