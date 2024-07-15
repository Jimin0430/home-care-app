import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CaregiverMyPageEdit = ({ navigation }) => {
  const [experience, setExperience] = useState(["대형 병원 간호사 2년 6개월"]);
  const [workTime, setWorkTime] = useState({ start: "", end: "" });

  const addExperience = () => {
    setExperience([...experience, ""]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>나의 프로필 수정페이지</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>나의 경력</Text>
        <Text style={styles.sectionSubtitle}>
          * 인증된 경력은 체크표시가 되며 나의 프로필에서도 표시됩니다.
        </Text>
        {experience.map((exp, index) => (
          <View key={index} style={styles.experienceItem}>
            <Ionicons name="checkmark-circle" size={24} color="green" />
            <Text style={styles.experienceText}>{exp}</Text>
          </View>
        ))}
        <TouchableOpacity style={styles.addButton} onPress={addExperience}>
          <Ionicons name="add-circle-outline" size={24} color="coral" />
          <Text style={styles.addButtonText}>나의 경력 입증하기</Text>
        </TouchableOpacity>
        <Text style={styles.hint}>4대보험 내역, 월급 명세서 등</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>첨부파일 선택하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>사진 찍기</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>고정 활동 시간</Text>
        <View style={styles.timeInputContainer}>
          <TextInput
            style={styles.timeInput}
            placeholder="00:00"
            value={workTime.start}
            onChangeText={(text) => setWorkTime({ ...workTime, start: text })}
          />
          <Text style={styles.timeSeparator}>~</Text>
          <TextInput
            style={styles.timeInput}
            placeholder="00:00"
            value={workTime.end}
            onChangeText={(text) => setWorkTime({ ...workTime, end: text })}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>한줄소개</Text>
        <Text style={styles.sectionSubtitle}>
          * 본인을 나타낼 수 있는 한줄소개를 작성해주세요.
        </Text>
        <TextInput
          style={styles.introInput}
          placeholder="소개글을 작성해주세요"
          multiline
        />
      </View>

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
  placeholder: {
    width: 24,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: "#888",
    marginBottom: 16,
  },
  experienceItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  experienceText: {
    marginLeft: 8,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  addButtonText: {
    color: "coral",
    marginLeft: 8,
  },
  hint: {
    fontSize: 12,
    color: "#888",
    marginTop: 8,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  button: {
    backgroundColor: "coral",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  timeInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  timeInput: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 8,
    width: 80,
    textAlign: "center",
  },
  timeSeparator: {
    marginHorizontal: 16,
  },
  introInput: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 8,
    height: 100,
    textAlignVertical: "top",
  },
  saveButton: {
    backgroundColor: "coral",
    padding: 16,
    margin: 16,
    borderRadius: 8,
  },
  saveButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CaregiverMyPageEdit;
