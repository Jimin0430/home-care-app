import { Alert } from "react-native";

export const showCustomAlert = (title, message, onPress = () => {}) => {
  Alert.alert(title, message, [{ text: "확인", onPress: onPress }], {
    cancelable: false,
  });
};

export const showRestrictedAccessAlert = (onPress = () => {}) => {
  showCustomAlert(
    "서비스 이용 제한",
    "해당 서비스는 요양 보호사 등록 후 사용 가능합니다.",
    onPress
  );
};
