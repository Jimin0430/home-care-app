import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRoute } from "@react-navigation/native";

import { getUserRole, getUserRoleIndex } from "../utils/storage";
import { setUserRole, setUserRoleIndex } from "../utils/storage";
import { useAuth } from "../contexts/AuthContext";

import Logo from "../assets/images/logo.svg";
import { signInScreenStyle } from "../styles/globalStyles";
import FileUploadButton from "./buttons/FileUploadButton";
import CameraButton from "./buttons/CameraButton";

export default function UploadCertificate() {
  const route = useRoute();
  // const { handleSignIn } = route.params;
  const { handleSignIn } = useAuth();

  const { userRole, userRoleIndex } = route.params;

  const [selectedImage, setSelectedImage] = useState(null);
  const [certifyLater, setCertifyLater] = useState(false);

  // 회원가입 후 앱에 재접속 하는 경우 로그인 상태 유지

  // const fetchUserRole = async () => {
  //   try {
  //     const role = await getUserRole();
  //     const roleIndex = await getUserRoleIndex();
  // setUserRole(role || false); // 초기 userRole을 false로 설정, getUserRole에서 값을 받아오면 해당 값으로 업데이트
  // setUserRoleIndex(roleIndex || -1);
  //   } catch (error) {
  //     console.log(error);
  //     setUserRole(false); //user-role key값이 존재하지 않는 초기 상태에 대한 처리
  //   }
  // };

  const fetchUserRole = () => {
    setUserRole(userRole || false); // 초기 userRole을 false로 설정, getUserRole에서 값을 받아오면 해당 값으로 업데이트
    setUserRoleIndex(userRoleIndex || -1);

    // App.js의 상태 업데이트 및 HomeTabs로 이동
    handleSignIn(userRole, userRoleIndex);
  };

  const certificateInfoTxt = () => {
    setCertifyLater(true);
  };

  return (
    <View style={signInScreenStyle.container}>
      <Logo width={60} height={60} />
      <View style={signInScreenStyle.explainText}>
        <Text style={signInScreenStyle.title}>
          자격증 이미지를 업로드 해주세요.
        </Text>
        <Text style={signInScreenStyle.explainText}>
          * 가능한 자격증 종류: 국가 공인 자격증
        </Text>
      </View>

      <View style={signInScreenStyle.buttonContainer}>
        <View style={signInScreenStyle.buttonHorizontal}>
          <FileUploadButton setSelectedImage={setSelectedImage} />
          <CameraButton setSelectedImage={setSelectedImage} />
        </View>
        <TouchableOpacity onPress={certificateInfoTxt}>
          <Text
            style={[
              signInScreenStyle.explainText,
              { textDecorationLine: "underline" },
            ]}
          >
            나중에 업로드 할게요.
          </Text>
        </TouchableOpacity>
        {certifyLater && (
          <Text style={[signInScreenStyle.explainText]}>
            * 자격증 업로드는 {"["}마이페이지{">"}나의 자격증{"]"} 에서
            가능합니다.
          </Text>
        )}
      </View>
      <View
        style={{
          flex: 1,
          width: "100%",
          alignItems: "center",
        }}
      >
        {selectedImage && (
          <Image source={{ uri: selectedImage }} style={styles.image} />
        )}
      </View>
      <View
        style={{
          flex: 1,
          width: "100%",
          justifyContent: "flex-end",
          paddingBottom: 20,
        }}
      >
        <TouchableOpacity
          style={signInScreenStyle.button}
          onPress={() => fetchUserRole()}
        >
          <Text style={signInScreenStyle.buttonText}>회원가입 완료하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
});
