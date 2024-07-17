import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SearchPatientHeader from "../components/SearchPatientHeader";

const vv = () => {
  const schedules = [
    {
      time: "7:00",
      title: "고양시 순찰씨",
      pay: "20,000원",
      duration: "오후 5시",
      date: "2024-07-29",
    },
    {
      time: "7:00",
      title: "고양시 순찰씨",
      pay: "15,000원",
      duration: "오전 11시",
      date: "2024-07-30",
    },
    {
      time: "8:20",
      title: "고양시 순찰씨",
      pay: "15,000원",
      duration: "오후 5시 30분",
      date: "2024-07-31",
    },
    {
      time: "9:00",
      title: "고양시 순찰씨",
      pay: "25,000원",
      duration: "오후 1시",
      date: "2024-07-31",
    },
    {
      time: "10:00",
      title: "고양시 순찰씨",
      pay: "10,000원",
      duration: "오후 9시",
      date: "2024-08-01",
    },
    {
      time: "10:00",
      title: "고양시 순찰씨",
      pay: "35,000원",
      duration: "오전 12시",
      date: "2024-08-02",
    },
    {
      time: "10:00",
      title: "고양시 순찰씨",
      pay: "10,000원",
      duration: "오후 2시",
      date: "2024-08-03",
    },
    {
      time: "10:45",
      title: "고양시 순찰씨",
      pay: "40,000원",
      duration: "오후 4시",
      date: "2024-08-04",
    },
    {
      time: "14:00",
      title: "고양시 순찰씨",
      pay: "25,000원",
      duration: "오후 5시",
      date: "2024-08-05",
    },
  ];

  return (
    <View style={styles.container}>
      <SearchPatientHeader
        schedules={schedules}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
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
});

export default vv;
