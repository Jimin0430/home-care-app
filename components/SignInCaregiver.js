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
} from "../apis/signInApi";

import { useAuth } from "../contexts/AuthContext";

import Logo from "../assets/images/logo.svg";

// 받침 여부 판단 함수
const hasFinalConsonant = (char) => {
  const lastChar = char && char[char?.length - 1];
  if (!lastChar) return false;
  const charCode = lastChar.charCodeAt(0);
  const consonantOffset = (charCode - 44032) % 28;
  return consonantOffset !== 0;
};

export default function SignInCaregiver({ route }) {
  //userRole 이 CareGiver 이면 다음 버튼 -> uploadCertificate (자격증 업로드) 페이지 -> 종료 ->hometab
  //userRole 이 AspiringCaregiver 이면 종료버튼 -> hometab
  const navigation = useNavigation();
  // const route = useRoute();
  // const { handleSignIn } = route.params;
  const { handleSignIn } = useAuth();

  const { userRole, userRoleIndex } = route.params;

  // const userRole = route.params?.userRole;
  // const userRoleIndex = route.params?.userRoleIndex;

  console.log("SignInCaregiver : " + userRole);
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

  const handleInputChange = async (name, value) => {
    setFormData({ ...formData, [name]: value });

    // 유효성 검사
    if (name === "username" && value) {
      try {
        const available = await checkUsernameAvailability(value);
        setUsernameAvailable(available);
      } catch (error) {
        console.error("Failed to check username availability:", error);
        // 사용자에게 오류 메시지를 표시할 수 있습니다.
        Alert.alert("오류", "닉네임 중복 확인 중 문제가 발생했습니다.");
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
    logFormData();
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

      // // 유효성 검사
      // if (
      //   !userInfo.name ||
      //   !userInfo.age ||
      //   !userInfo.gender ||
      //   !userInfo.phone ||
      //   !userInfo.address ||
      //   !userInfo.username ||
      //   !userInfo.email ||
      //   !userInfo.password
      // ) {
      //   Alert.alert("모든 필드를 채워주세요.");
      //   return;
      // }

      // username 중복 검사
      if (!usernameAvailable) {
        Alert.alert("사용할 수 없는 닉네임입니다. 다른 닉네임을 입력해주세요.");
        return;
      }

      const data = await submitCaregiverInfo(userInfo);
      console.log("Server response:", data);
      // Clear the form
      setFormData(initialState);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCompleteSignup = async () => {
    await handleSubmit();
    console.log("SignInCaregiver : ", userRole);
    console.log("회원가입 완료하기 클릭됨");

    handleSignIn(userRole, userRoleIndex);
  };

  const moveToSubmit = async () => {
    await handleSubmit();
    console.log("다음 버튼 클릭");
    navigation.navigate("UploadCertificate", {
      userRole: userRole,
      userRoleIndex: userRoleIndex,
    });
  };

  const userInfoFields = {
    이름: { value: formData.name, key: "name" },
    닉네임: { value: formData.username, key: "username" },
    이메일: { value: formData.email, key: "email" },
    비밀번호: { value: formData.passWord, key: "passWord" },
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
      behavior={Platform.OS === "ios" ? "padding" : "height"}
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
                  />
                  {label === "닉네임" && (
                    <Text style={signInScreenStyle.subTitle}>
                      {usernameAvailable === null
                        ? ""
                        : usernameAvailable
                        ? "사용 가능한 닉네임입니다."
                        : "이미 사용 중인 닉네임입니다."}
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
