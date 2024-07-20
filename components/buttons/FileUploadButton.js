import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { signInScreenStyle } from "../../styles/globalStyles";
import * as ImagePicker from "expo-image-picker";

export default function FileUploadButton({ setSelectedImage }) {
  const pickImage = async () => {
    // Ask for permission to access media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Sorry, we need camera roll permissions to make this work!"
      );
      return;
    }

    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <TouchableOpacity style={signInScreenStyle.buttonShort} onPress={pickImage}>
      <Text style={signInScreenStyle.buttonText}>첨부파일 선택하기</Text>
    </TouchableOpacity>
  );
}
