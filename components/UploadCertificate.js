import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import Logo from "../assets/images/logo.svg";
import { signInScreenStyle } from "../styles/globalStyles";
import FileUploadButton from "./buttons/FileUploadButton";
import CameraButton from "./buttons/CameraButton";

export default function UploadCertificate() {
  const navigation = useNavigation();

  const [selectedImage, setSelectedImage] = useState(null);
  const [certifyLater, setCertifyLater] = useState(false);

  const handleCompleteSignup = async () => {
    navigation.navigate("HomeTabs");
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
          onPress={handleCompleteSignup}
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
