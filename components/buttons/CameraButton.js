import React from "react";
import {
  Button,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { signInScreenStyle } from "../../styles/globalStyles";

const PhotoButton = ({ setSelectedImage }) => {
  const takePhoto = async () => {
    // 카메라 접근 권한 요청
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("카메라 권한이 필요합니다.");
      return;
    }

    // 카메라 실행 및 사진 촬영
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);

      console.log(result.assets[0].uri); // 여기서 result.uri를 사용해서 사진을 업로드하거나 처리할 수 있습니다.
    }
  };

  return (
    <TouchableOpacity style={signInScreenStyle.buttonShort} onPress={takePhoto}>
      <Text style={signInScreenStyle.buttonText}>사진찍기</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PhotoButton;
