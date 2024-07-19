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
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { signInScreenStyle } from "../styles/globalStyles";
import { submitPatientInfo } from "../apis/signInApi";
import { useAuth } from "../contexts/AuthContext";

import Dropdown from "./buttons/Dropdown";
import SingleChoiceSelector from "./buttons/OptionPicker";
import Logo from "../assets/images/logo.svg";

// 받침 여부 판단 함수
const hasFinalConsonant = (char) => {
  const lastChar = char && char[char?.length - 1];
  if (!lastChar) return false;
  const charCode = lastChar.charCodeAt(0);
  const consonantOffset = (charCode - 44032) % 28;
  return consonantOffset !== 0;
};

export default function SignInPatient({ route }) {
  // const  = useRoute();
  // const { handleSignIn } = route.params;
  const { handleSignIn } = useAuth();

  const { userRole, userRoleIndex } = route.params;

  const moveToHomeTab = () => {
    handleSignIn(userRole, userRoleIndex);
    console.log("sign in page : " + userRole);
    // try {
    //   // App.js의 상태 업데이트 및 HomeTabs로 이동
    //   handleSignIn(userRole, userRoleIndex);

    // } catch (e) {
    //   console.log("sign in page moveToHomeTab click error", e);
    // }
  };

  const options = ["고민 중이에요.", "구하는 중이에요.", "당장 필요해요."];
  const [items, setItems] = useState([
    { label: "본인", value: 0 },
    { label: "자녀", value: 1 },
    { label: "부모", value: 2 },
    { label: "배우자", value: 3 },
    { label: "친척", value: 4 },
    { label: "기타", value: 5 },
  ]);

  // 초기 상태 설정
  const initialState = {
    name: "",
    age: 0,
    gender: "",
    phone: "",
    address: "",
    relationship_index: 0,
  };

  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const logFormData = () => {
    console.log({
      name: formData.name,
      age: parseInt(formData.age),
      gender: formData.gender,
      phone: formData.phone,
      address: formData.address,
      relationship_index: parseInt(formData.relationship_index),
    });
  };

  //유저 정보 저장
  const handleSubmit = async () => {
    logFormData();
    try {
      const userInfo = {
        name: formData.name,
        age: parseInt(formData.age),
        gender: formData.gender,
        phone: formData.phone,
        address: formData.address,
        relationship_index: parseInt(formData.relationship_index),
      };
      const data = await submitPatientInfo(userInfo);
      console.log("Server response:", data);
      // Clear the form
      setFormData(initialState);
    } catch (e) {
      console.log(e);
      Alert.alert("Error", "Failed to save user data");
    }
  };

  const handleCompleteSignup = async () => {
    await handleSubmit();
    moveToHomeTab();
    //userRole, userRoleIndex 저장은 이미 signIn 페이지에서 함
  };

  // 화면 렌더링 map에 사용 & api 연동
  const userInfoFields = {
    이름: { value: formData.name, key: "name" },
    나이: { value: formData.age, key: "age" },
    성별: { value: formData.gender, key: "gender", placeholder: "(ex. 여자)" },
    전화번호: { value: formData.phone, key: "phone" },
    주소: { value: formData.address, key: "address" },
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
    <KeyboardAvoidingView
      // behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={signInScreenStyle.keyboardPush}
      keyboardVerticalOffset={statusBarHeight}
    >
      <View style={signInScreenStyle.container}>
        <Logo width={60} height={60} />

        <Text style={signInScreenStyle.title}>
          {" "}
          본인의 정보를 입력해주세요.
        </Text>
        <View style={signInScreenStyle.inputList}>
          <ScrollView
            contentContainerStyle={signInScreenStyle.scrollViewContent}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            {Object.keys(userInfoFields).map((label) => {
              const particle = hasFinalConsonant(label) ? "을" : "를";
              return (
                <View
                  key={userInfoFields[label].key}
                  style={signInScreenStyle.inputContainer}
                >
                  <Text style={signInScreenStyle.subTitle}>{label}</Text>
                  <TextInput
                    style={signInScreenStyle.input}
                    placeholder={
                      userInfoFields[label].placeholder !== undefined
                        ? `본인의 ${label}${particle} 입력해주세요. ${userInfoFields[label].placeholder}`
                        : `본인의 ${label}${particle} 입력해주세요.`
                    }
                    value={userInfoFields[label].value}
                    onChangeText={(text) =>
                      handleInputChange(userInfoFields[label].key, text)
                    }
                    secureTextEntry={label === "비밀번호"} // 비밀번호 입력 시 텍스트 숨김
                  />
                </View>
              );
            })}
            <View style={signInScreenStyle.inputContainer}>
              <Text style={signInScreenStyle.subTitle}>환자와의 관계</Text>
              <Dropdown
                items={items}
                setItems={setItems}
                formData={formData}
                handleInputChange={handleInputChange}
              />
            </View>
            <View style={signInScreenStyle.inputContainer}>
              <Text style={signInScreenStyle.subTitle}>
                간병서비스 필요 정도 (택1)
              </Text>
              <SingleChoiceSelector
                options={options}
                formData={formData}
                handleInputChange={handleInputChange}
              />
            </View>
            <TouchableOpacity
              style={signInScreenStyle.button}
              onPress={handleCompleteSignup}
            >
              <Text style={signInScreenStyle.buttonText}>
                회원가입 완료하기
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
