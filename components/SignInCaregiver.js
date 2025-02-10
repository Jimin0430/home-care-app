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
import { useNavigation, useRoute } from "@react-navigation/native";
import { signInScreenStyle } from "../styles/globalStyles";
import {
  submitCaregiverInfo,
  checkUsernameAvailability,
  checkEmailAvailability,
} from "../apis/signInApi";

import { useAuth } from "../contexts/AuthContext";

import SelectOneOfTwo from "./SelectOneOfTwo";
import Logo from "../assets/images/logo.svg";
import { Color } from "../styles/color";
import { getUserName, setUserName } from "../utils/storage";

// 받침 여부 판단 함수
const hasFinalConsonant = (char) => {
  const lastChar = char && char[char?.length - 1];
  if (!lastChar) return false;
  const charCode = lastChar.charCodeAt(0);
  const consonantOffset = (charCode - 44032) % 28;
  return consonantOffset !== 0;
};

export default function SignInCaregiver({ route }) {
  const navigation = useNavigation();
  const { handleSignIn } = useAuth();

  const { userRole, userRoleIndex } = route.params;

  // 초기 상태 설정
  const initialState = {
    name: "",
    username: "",
    email: "",
    password: "",
    age: 0,
    gender: "",
    phone: "",
    address: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [emailAvailable, setEmailAvailable] = useState(null);

  const handleInputChange = async (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const checkAvailability = async (name, value) => {
    // 유효성 검사
    if (name === "username" && value) {
      try {
        const available = await checkUsernameAvailability(value);
        setUsernameAvailable(available);
      } catch (error) {
        console.error("Failed to check username availability:", error);
      }
    } else if (name === "email" && value) {
      try {
        const available = await checkEmailAvailability(value);
        setEmailAvailable(available);
      } catch (error) {
        console.error("Failed to check email availability:", error);
      }
    }
  };

  const logFormData = () => {
    console.log({
      name: formData.name,
      age: parseInt(formData.age),
      gender: formData.gender,
      phone: formData.phone,
      address: formData.address,
      username: formData.username,
      email: formData.email,
      password: formData.password,
    });
  };

  const handleSubmit = async () => {
    // logFormData();
    try {
      const userInfo = {
        name: formData.name,
        age: parseInt(formData.age),
        gender: formData.gender,
        phone: formData.phone,
        address: formData.address,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };

      const data = await submitCaregiverInfo(userInfo);
      if (data.response) {
        setUserName(userInfo.username);
      }

      setFormData(initialState);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCompleteSignup = async () => {
    await handleSubmit();
    handleSignIn(userRole, userRoleIndex);
  };

  const moveToSubmit = async () => {
    await handleSubmit();
    navigation.navigate("UploadCertificate", {
      userRole: userRole,
      userRoleIndex: userRoleIndex,
    });
  };

  const userInfoFields = {
    이름: { value: formData.name, key: "name" },
    닉네임: { value: formData.username, key: "username" },
    이메일: { value: formData.email, key: "email" },
    비밀번호: { value: formData.password, key: "password" },
    나이: { value: formData.age, key: "age" },
    성별: { value: formData.gender, key: "gender", placeholder: "(ex. 여자)" },
    전화번호: { value: formData.phone, key: "phone" },
    주소: { value: formData.address, key: "address" },
  };

  const { StatusBarManager } = NativeModules;

  //StatusBarManager.getHeight는 iOS에서만 호출되도록
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
                  {label === "닉네임" || label === "이메일" ? (
                    <View style={{ flexDirection: "row", gap: 10 }}>
                      <TextInput
                        style={[signInScreenStyle.input, { width: "70%" }]}
                        placeholder={
                          userInfoFields[label].placeholder !== undefined
                            ? `${label}${particle} 입력해주세요. ${userInfoFields[label].placeholder}`
                            : `${label}${particle} 입력해주세요.`
                        }
                        value={userInfoFields[label].value}
                        onChangeText={(text) =>
                          handleInputChange(userInfoFields[label].key, text)
                        }
                      />

                      <TouchableOpacity
                        onPress={(text) =>
                          checkAvailability(userInfoFields[label].key, text)
                        }
                        style={[
                          signInScreenStyle.button,
                          { width: "30%", backgroundColor: "#ff8266" },
                        ]}
                      >
                        <Text
                          style={[
                            signInScreenStyle.buttonText,
                            { fontSize: 14 },
                          ]}
                        >
                          {" "}
                          중복 확인하기{" "}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : label === "성별" ? (
                    <SelectOneOfTwo
                      leftButtonText={"여자"}
                      rightButtonText={"남자"}
                      handleInputChange={handleInputChange}
                    />
                  ) : (
                    <TextInput
                      style={signInScreenStyle.input}
                      placeholder={
                        userInfoFields[label].placeholder !== undefined
                          ? `${label}${particle} 입력해주세요. ${userInfoFields[label].placeholder}`
                          : `${label}${particle} 입력해주세요.`
                      }
                      value={userInfoFields[label].value}
                      onChangeText={(text) =>
                        handleInputChange(userInfoFields[label].key, text)
                      }
                      secureTextEntry={label === "비밀번호"} // 비밀번호 입력 시 텍스트 숨김
                    />
                  )}
                  {label === "닉네임" && usernameAvailable !== null && (
                    <Text
                      style={[
                        signInScreenStyle.explainText,
                        { color: Color.pink900 },
                      ]}
                    >
                      {usernameAvailable
                        ? "사용 가능한 닉네임입니다."
                        : "이미 사용 중인 닉네임입니다."}
                    </Text>
                  )}
                  {label === "이메일" && emailAvailable !== null && (
                    <Text
                      style={[
                        signInScreenStyle.explainText,
                        { color: Color.pink900 },
                      ]}
                    >
                      {emailAvailable
                        ? "사용 가능한 이메일입니다."
                        : "이미 사용 중인 이메일입니다."}
                    </Text>
                  )}
                </View>
              );
            })}

            {userRole === "Caregiver" && (
              <TouchableOpacity
                style={signInScreenStyle.button}
                onPress={() => moveToSubmit()}
              >
                <Text style={signInScreenStyle.buttonText}>다음</Text>
              </TouchableOpacity>
            )}
            {userRole === "AspiringCaregiver" && (
              <TouchableOpacity
                style={signInScreenStyle.button}
                onPress={() => handleCompleteSignup()}
              >
                <Text style={signInScreenStyle.buttonText}>
                  회원가입 완료하기
                </Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
