import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signInScreenStyle } from "../styles/globalStyles";
import { submitCaregiverInfo } from "../apis/signInApi";

import Logo from "../assets/images/logo.svg";

// 받침 여부 판단 함수
const hasFinalConsonant = (char) => {
  const lastChar = char && char[char?.length - 1];
  if (!lastChar) return false;
  const charCode = lastChar.charCodeAt(0);
  const consonantOffset = (charCode - 44032) % 28;
  return consonantOffset !== 0;
};

export default function SignInCaregiver() {
  //userType 이 CareGiver 이면 다음 버튼 -> 업로드 페이지 -> 종료 ->hometab
  //userType 이 AspiringCaregiver 이면 종료버튼 -> hometab
  const route = useRoute();
  const navigation = useNavigation();
  const { userType } = route.params;

  // 초기 상태 설정
  const initialState = {
    name: "",
    nickname: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    experience: "",
    desiredHourlyRate: "",
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
      experience: formData.experience,
      desired_hourly_rate: parseInt(formData.desiredHourlyRate),
    });
  };

  const handleSubmit = async () => {
    logFormData();
    try {
      const userInfo = {
        name: formData.name,
        age: parseInt(formData.age),
        gender: formData.gender,
        phone: formData.phone,
        address: formData.address,
        experience: formData.experience,
        desired_hourly_rate: parseInt(formData.desiredHourlyRate),
      };
      const data = await submitCaregiverInfo(userInfo);
      console.log("Server response:", data);
      // Clear the form
      setFormData(initialState);
    } catch (e) {
      console.log(e);
      Alert.alert("Error", "Failed to save user data");
    }
  };

  const setIsSignedIn = async (value) => {
    try {
      const userType = JSON.stringify(value);
      await AsyncStorage.setItem("user-role", userType);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCompleteSignup = async () => {
    // 원래는 userType 넘겨줘야 함
    await handleSubmit();
    setIsSignedIn(false);
    navigation.navigate("HomeTabs");
  };

  const moveToSubmit = async () => {
    await handleSubmit();
    // 원래는 userType 넘겨줘야 함
    setIsSignedIn(false);
    console.log("다음 버튼 클릭");
    navigation.navigate("UploadCertificate");
  };

  const userInfoFields = {
    이름: { value: formData.name, key: "name" },
    닉네임: { value: formData.nickname, key: "nickname" },
    나이: { value: formData.age, key: "age" },
    성별: { value: formData.gender, key: "gender", placeholder: "(ex. 여자)" },
    전화번호: { value: formData.phone, key: "phone" },
    주소: { value: formData.address, key: "address" },
    경력: { value: formData.experience, key: "experience" },
    희망시급: { value: formData.desiredHourlyRate, key: "desiredHourlyRate" },
  };

  return (
    <View style={signInScreenStyle.container}>
      <Logo width={60} height={60} />

      <Text style={signInScreenStyle.title}> 본인의 정보를 입력해주세요.</Text>
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
                />
              </View>
            );
          })}

          {userType === "Caregiver" && (
            <TouchableOpacity
              style={signInScreenStyle.button}
              onPress={moveToSubmit}
            >
              <Text style={signInScreenStyle.buttonText}>다음</Text>
            </TouchableOpacity>
          )}
          {userType === "AspiringCaregiver" && (
            <TouchableOpacity
              style={signInScreenStyle.button}
              onPress={handleCompleteSignup}
            >
              <Text style={signInScreenStyle.buttonText}>
                회원가입 완료하기
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
