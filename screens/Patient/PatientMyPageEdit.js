import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PatientMyPageEdit = () => {
  const [experience, setExperience] = useState([
    { id: 1, title: "대형 병원 간호사 2년 6개월", checked: true },
    { id: 2, title: "방문 요양사 1년", checked: false },
  ]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [introduction, setIntroduction] = useState("");

  const toggleExperience = (id) => {
    setExperience(
      experience.map((exp) =>
        exp.id === id ? { ...exp, checked: !exp.checked } : exp
      )
    );
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>마이페이지</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>나의 경력</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add-circle-outline" size={24} color="#FF6F61" />
        </TouchableOpacity>
      </View>

      <Text style={styles.note}>
        * 인증된 경력은 체크표시가 되며 나의 프로필에서도 표시됩니다.
      </Text>

      {experience.map((exp) => (
        <View key={exp.id} style={styles.experienceItem}>
          <Switch
            value={exp.checked}
            onValueChange={() => toggleExperience(exp.id)}
            trackColor={{ false: "#767577", true: "#FF6F61" }}
            thumbColor={exp.checked ? "#f4f3f4" : "#f4f3f4"}
          />
          <Text style={styles.experienceText}>{exp.title}</Text>
        </View>
      ))}

      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>경력 인증하기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>사진 찍기</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>고정 활동 시간</Text>
      </View>

      <View style={styles.timeInputContainer}>
        <TextInput
          style={styles.timeInput}
          value={startTime}
          onChangeText={setStartTime}
          placeholder="00:00"
        />
        <Text style={styles.timeInputSeparator}>~</Text>
        <TextInput
          style={styles.timeInput}
          value={endTime}
          onChangeText={setEndTime}
          placeholder="00:00"
        />
      </View>

      <View style={styles.buttonGroup}>
        <TouchableOpacity style={[styles.button, styles.saveButton]}>
          <Text style={styles.buttonText}>저장</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.cancelButton]}>
          <Text style={styles.buttonText}>닫기</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>한줄소개</Text>
      </View>

      <TextInput
        style={styles.introductionInput}
        value={introduction}
        onChangeText={setIntroduction}
        placeholder="소개글을 작성해주세요"
        multiline
      />

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>저장</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  addButton: {
    padding: 5,
  },
  note: {
    fontSize: 12,
    color: "#888",
    marginBottom: 10,
  },
  experienceItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  experienceText: {
    marginLeft: 10,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#FF6F61",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  timeInputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  timeInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    width: 80,
    textAlign: "center",
  },
  timeInputSeparator: {
    marginHorizontal: 10,
  },
  saveButton: {
    backgroundColor: "#FF6F61",
  },
  cancelButton: {
    backgroundColor: "#ddd",
  },
  introductionInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    height: 100,
    textAlignVertical: "top",
    marginBottom: 20,
  },
  saveButtonText: {
    color: "#fff",
    textAlign: "center",
    padding: 15,
  },
});

export default PatientMyPageEdit;
