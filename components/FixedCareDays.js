import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { profileEditStyle, signInScreenStyle } from "../styles/globalStyles";
import { Color } from "../styles/color";

const daysOfWeek = ["월", "화", "수", "목", "금", "토", "일"];

export default function FixedCareDays() {
  const [selectedDays, setSelectedDays] = useState([]);

  const toggleDay = (day) => {
    setSelectedDays((prevDays) =>
      prevDays.includes(day)
        ? prevDays.filter((d) => d !== day)
        : [...prevDays, day]
    );
  };

  return (
    <View style={profileEditStyle.inputContainer}>
      <Text style={signInScreenStyle.subTitle}>고정 간병일</Text>
      <View style={styles.daysContainer}>
        {daysOfWeek.map((day) => (
          <TouchableOpacity
            key={day}
            style={[
              styles.dayButton,
              selectedDays.includes(day) && styles.selectedDayButton,
            ]}
            onPress={() => toggleDay(day)}
          >
            <Text
              style={[
                styles.dayButtonText,
                selectedDays.includes(day) && styles.selectedDayButtonText,
              ]}
            >
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  daysContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  dayButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  selectedDayButton: {
    backgroundColor: Color.pink700,
  },
  dayButtonText: {
    fontSize: 16,
    color: "#000",
  },
  selectedDayButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
