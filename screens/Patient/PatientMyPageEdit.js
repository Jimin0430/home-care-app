import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  NativeModules,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  StatusBar,
  Keyboard,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { signInScreenStyle } from "../../styles/globalStyles";
import CustomSlider from "../../components/CustomSlider";
import DiseaseSeverityTable from "../../components/DiseaseSeverityTable";

// 받침 여부 판단 함수
const hasFinalConsonant = (char) => {
  const lastChar = char && char[char?.length - 1];
  if (!lastChar) return false;
  const charCode = lastChar.charCodeAt(0);
  const consonantOffset = (charCode - 44032) % 28;
  return consonantOffset !== 0;
};

export default function PatientMyPageEdit({ navigation }) {
  const initialState = {
    name: "",
    age: "",
    height: "",
    weight: "",
    gender: "",
    disease: "",
    extentOfDisease: 0,
  };

  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const saveButton = () => {
    //async 제거. api 완성 안됨
    // await handleSubmit();
    navigation.goBack();
    console.log("save 버튼 클릭");
  };

  const userInfoFields = {
    이름: {
      value: formData.name,
      key: "name",
      placeholder: "환자의 이름을 입력해주세요",
    },
    나이: {
      value: formData.age,
      key: "age",
      placeholder: "환자의 나이를 입력해주세요",
    },
    키: {
      value: formData.height,
      key: "height",
      placeholder: "환자의 키를 입력해주세요 (cm)",
    },
    몸무게: {
      value: formData.weight,
      key: "weight",
      placeholder: "환자의 몸무게를 입력해주세요 (kg)",
    },
    성별: {
      value: formData.gender,
      key: "gender",
      placeholder: "성별을 입력해주세요 (ex. 남자)",
    },
  };

  const diseaseFields = {
    병명: {
      value: formData.disease,
      key: "disease",
      placeholder: "환자의 병명,증상을 입력해주세요",
    },
  };

  const { StatusBarManager } = NativeModules;

  useEffect(() => {
    Platform.OS == "ios"
      ? StatusBarManager.getHeight((statusBarFrameData) => {
          setStatusBarHeight(statusBarFrameData.height);
        })
      : null;
  }, []);

  const [statusBarHeight, setStatusBarHeight] = useState(0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>나의 프로필 수정페이지</Text>
        <View style={styles.placeholder} />
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={[
            signInScreenStyle.scrollViewContent,
            { flexGrow: 1 },
          ]}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={[signInScreenStyle.keyboardPush, { flex: 1 }]}
            keyboardVerticalOffset={statusBarHeight + 44}
          >
            <View style={styles.container}>
              <Text style={styles.title}>환자 정보를 입력해주세요</Text>
              <View style={styles.inputList}>
                {Object.keys(userInfoFields).map((label) => {
                  const particle = hasFinalConsonant(label) ? "을" : "를";
                  return (
                    <View
                      key={userInfoFields[label].key}
                      style={styles.inputContainer}
                    >
                      <Text style={signInScreenStyle.subTitle}>{label}</Text>
                      <TextInput
                        style={signInScreenStyle.input}
                        placeholder={
                          userInfoFields[label].placeholder !== undefined
                            ? userInfoFields[label].placeholder
                            : `본인의 ${label}${particle} 입력해주세요.`
                        }
                        value={userInfoFields[label].value}
                        onChangeText={(text) =>
                          handleInputChange(userInfoFields[label].key, text)
                        }
                      />
                    </View>
                  );
                })}

                {Object.keys(diseaseFields).map((label) => {
                  const particle = hasFinalConsonant(label) ? "을" : "를";
                  return (
                    <View
                      key={diseaseFields[label].key}
                      style={signInScreenStyle.inputContainer}
                    >
                      <Text style={signInScreenStyle.subTitle}>{label}</Text>
                      <TextInput
                        style={signInScreenStyle.input}
                        placeholder={
                          diseaseFields[label].placeholder !== undefined
                            ? diseaseFields[label].placeholder
                            : `본인의 ${label}${particle} 입력해주세요.`
                        }
                        value={diseaseFields[label].value}
                        onChangeText={(text) =>
                          handleInputChange(diseaseFields[label].key, text)
                        }
                      />
                    </View>
                  );
                })}
                <Text style={signInScreenStyle.subTitle}>증세 정도 선택</Text>

                <View style={{ flex: 1, width: "100%" }}>
                  <CustomSlider
                    style={{ flex: 1, width: "100%", height: 40 }}
                    minimumValue={0}
                    maximumValue={5}
                    step={1}
                    value={formData.extentOfDisease}
                    onValueChange={(value) =>
                      handleInputChange("extentOfDisease", value)
                    }
                  />
                </View>

                {/* <Text>선택된 증세 정도: {formData.extentOfDisease}단계</Text> */}

                <DiseaseSeverityTable />
                <TouchableOpacity
                  style={signInScreenStyle.button}
                  onPress={() => saveButton()}
                >
                  <Text style={signInScreenStyle.buttonText}>저장</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
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
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    gap: 45,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    width: "100%",
  },
  inputList: {
    width: "100%",
    padding: 10,
    gap: 23,
  },
  inputContainer: {
    width: "100%",
    gap: 11,
  },
});
