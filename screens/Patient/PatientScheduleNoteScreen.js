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
import { profileEditStyle, signInScreenStyle } from "../../styles/globalStyles";
import MedicationList from "../../components/AddList";
import Header from "../../components/Header";

export default function PatientScheduleNoteScreen({ navigation }) {
  const { StatusBarManager } = NativeModules;

  useEffect(() => {
    Platform.OS == "ios"
      ? StatusBarManager.getHeight((statusBarFrameData) => {
          setStatusBarHeight(statusBarFrameData.height);
        })
      : null;
  }, []);

  const [statusBarHeight, setStatusBarHeight] = useState(0);

  const handleCompleteButton = () => {
    navigation.navigate("HomeTabs");
  };
  return (
    <SafeAreaView style={profileEditStyle.safeArea}>
      <Header title={"일정 관리하기"} />

      <KeyboardAvoidingView
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={signInScreenStyle.keyboardPush}
        keyboardVerticalOffset={statusBarHeight + 44}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={[
              signInScreenStyle.scrollViewContent,
              { gap: 20, paddingBottom: 20 },
            ]}
          >
            <View style={profileEditStyle.container}>
              <Text style={profileEditStyle.title}>
                기타 유의 사항을 입력해주세요
              </Text>

              <MedicationList title={"복용하는 약"} />
              <View style={profileEditStyle.inputContainer}>
                <Text style={signInScreenStyle.subTitle}>
                  간병인에게 전하고 싶은 말
                </Text>
                <TextInput
                  style={profileEditStyle.input}
                  placeholder="기타 주의사항 등을 작성해주세요"
                />
              </View>
              <View style={profileEditStyle.inputContainer}>
                <Text style={signInScreenStyle.subTitle}>추가금 (선택)</Text>
                <View style={{ paddingLeft: 20, gap: 15 }}>
                  <View style={{ gap: 10 }}>
                    <Text style={profileEditStyle.subText}>
                      간병 서비스가{" "}
                      <Text style={profileEditStyle.boldText}>당장</Text>{" "}
                      필요헤요
                    </Text>
                    <View style={profileEditStyle.unitInputContainer}>
                      <TextInput
                        style={profileEditStyle.optionalBoxContainer}
                        placeholder="추가금을 입력해주세요"
                      />
                      <Text style={signInScreenStyle.boxInnerText}>원</Text>
                    </View>
                  </View>

                  <View style={{ gap: 10 }}>
                    <Text style={profileEditStyle.subText}>
                      <Text style={profileEditStyle.boldText}>
                        심각한 중증환자
                      </Text>
                      에요
                    </Text>
                    <View style={profileEditStyle.unitInputContainer}>
                      <TextInput
                        style={profileEditStyle.optionalBoxContainer}
                        placeholder="추가금을 입력해주세요"
                      />
                      <Text style={signInScreenStyle.boxInnerText}>원</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <View style={{ paddingHorizontal: 41, paddingVertical: 41 }}>
        <TouchableOpacity
          style={[signInScreenStyle.button, { borderRadius: 10 }]}
          onPress={() => handleCompleteButton()}
        >
          <Text style={signInScreenStyle.buttonText}>공고 등록하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
