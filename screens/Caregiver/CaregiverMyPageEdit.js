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
  StyleSheet,
} from "react-native";
import { profileEditStyle, signInScreenStyle } from "../../styles/globalStyles";
import AddList from "../../components/AddList";
import Header from "../../components/Header";
import TimePicker from "../../components/TimePicker";
import SelectOneOfTwo from "../../components/SelectOneOfTwo";
import { Foundation } from "@expo/vector-icons";
import { Color } from "../../styles/color";
import FileUploadButton from "../../components/buttons/FileUploadButton";
import CameraButton from "../../components/buttons/CameraButton";
import CareerList from "../../components/CareerList";

export default function CaregiverMyPageEdit({ navigation }) {
  const { StatusBarManager } = NativeModules;

  const [timeStart, setTimeStart] = useState(new Date());
  const [timeEnd, setTimeEnd] = useState(new Date());
  const [showTimeStartPicker, setShowTimeStartPicker] = useState(false);
  const [showTimeEndPicker, setShowTimeEndPicker] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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

  useEffect(() => {
    Platform.OS == "ios"
      ? StatusBarManager.getHeight((statusBarFrameData) => {
          setStatusBarHeight(statusBarFrameData.height);
        })
      : null;
  }, []);

  const career = [
    { career: "병원 간호사 2년", certified: true },
    { career: "요양원 간호사 1년", certified: false },
  ];

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
            <View style={[profileEditStyle.container, { gap: 30 }]}>
              <View
                style={{
                  width: "100%",
                  gap: 7,
                  flexDirection: "column",
                }}
              >
                <Text style={profileEditStyle.title}>나의 경력</Text>
                <Text
                  style={[signInScreenStyle.explainText, { lineHeight: 20 }]}
                >
                  * 인증된 경력은 체크표시가 되며 나의 프로필에서도 {"\n"}표시
                  됩니다.
                </Text>
                <CareerList data={career} />
              </View>
              <AddList
                title="나의 경력 입력하기"
                placeholder="본인의 경력을 입력해주세요"
              />

              <View style={[profileEditStyle.inputContainer]}>
                <Text style={signInScreenStyle.subTitle}>
                  나의 경력 인증하기
                </Text>
                <View style={styles.container}>
                  <View style={styles.iconContainer}>
                    <Foundation
                      name="lightbulb"
                      size={24}
                      color={Color.pink900}
                    />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.mainText}>
                      경력을 인증할 수 있는 자료를 업로드 하세요.
                    </Text>
                    <Text style={styles.subText}>
                      * 4대보험 내역, 월급 명세서 등
                    </Text>
                  </View>
                </View>
                <View style={signInScreenStyle.buttonHorizontal}>
                  <FileUploadButton
                    setSelectedImage={setSelectedImage}
                    style={{ flex: 1 }}
                  />
                  <CameraButton
                    setSelectedImage={setSelectedImage}
                    style={{ flex: 1 }}
                  />
                </View>
              </View>
              <View style={profileEditStyle.inputContainer}>
                <Text style={profileEditStyle.title}>활동 지역</Text>
                <TextInput
                  style={profileEditStyle.input}
                  placeholder="본인의 활동 지역을 입력해주세요"
                />
              </View>

              <View style={profileEditStyle.inputContainer}>
                <Text style={profileEditStyle.title}>고정 활동 시간</Text>

                <TimePicker
                  timeStart={timeStart}
                  timeEnd={timeEnd}
                  onChangeTimeStart={onChangeTimeStart}
                  onChangeTimeEnd={onChangeTimeEnd}
                  showTimeStartPicker={showTimeStartPicker}
                  setShowTimeStartPicker={setShowTimeStartPicker}
                  showTimeEndPicker={showTimeEndPicker}
                  setShowTimeEndPicker={setShowTimeEndPicker}
                />
              </View>
              <View style={profileEditStyle.inputContainer}>
                <Text style={profileEditStyle.title}>희망 시급</Text>
                <TextInput
                  style={profileEditStyle.input}
                  placeholder="본인의 희망 시급을 입력해주세요"
                />
              </View>
              <View style={profileEditStyle.inputContainer}>
                <Text style={profileEditStyle.title}>희망 고용 형태</Text>
                <SelectOneOfTwo
                  leftButtonText={"장기"}
                  rightButtonText={"단기"}
                />
              </View>
              <View style={profileEditStyle.inputContainer}>
                <Text style={profileEditStyle.title}>전문 분야</Text>
                <TextInput
                  style={profileEditStyle.input}
                  placeholder="본인의 전문 분야를 입력해주세요"
                />
              </View>
              <View style={profileEditStyle.inputContainer}>
                <View
                  style={{
                    flex: 1,
                    width: "100%",
                    gap: 7,
                    flexDirection: "column",
                  }}
                >
                  <Text style={profileEditStyle.title}>한줄 소개</Text>

                  <Text
                    style={[signInScreenStyle.explainText, { lineHeight: 20 }]}
                  >
                    * 본인을 나타낼 수 있는 한줄소개를 작성해주세요. {"\n"}
                    한줄소개는 환자&보호자에게 보여지는 정보입니다.
                  </Text>
                </View>
                <TextInput
                  style={[
                    profileEditStyle.input,
                    { height: 100, textAlignVertical: "top" }, //맨 위에를 작성 시작 위치로 설정
                  ]}
                  placeholder="소개를 작성해주세요"
                  multiline={true}
                />
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <View style={{ paddingHorizontal: 41, paddingVertical: 21 }}>
        <TouchableOpacity
          style={[signInScreenStyle.button, { borderRadius: 10 }]}
          onPress={() => handleCompleteButton()}
        >
          <Text style={signInScreenStyle.buttonText}>저장</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 15,
    borderRadius: 8,
    position: "relative",
  },
  iconContainer: {
    position: "absolute",
    top: 13,
    left: 16,
  },
  textContainer: {
    // flex: 1,
    marginLeft: 30,
  },
  mainText: {
    fontSize: 16,
    marginBottom: 5,
  },
  subText: {
    fontSize: 14,
    color: "#666",
  },
});
