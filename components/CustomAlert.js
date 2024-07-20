import { Alert } from "react-native";

export const showCustomAlert = (title, message, onPress = () => {}) => {
  Alert.alert(title, message, [{ text: "확인", onPress: onPress }], {
    cancelable: false,
  });
};

export const showRestrictedAccessAlert = (
  messageType = "restricted",
  onPress = () => {}
) => {
  const messages = {
    restricted: "해당 서비스는 요양 보호사 등록 후 사용 가능합니다.",
    upcomingCaregiver: "환자 매칭 후 사용 가능한 기능입니다.",
    upcomingPatient: "요양사 매칭 후 사용 가능한 기능입니다.",
  };

  showCustomAlert("서비스 이용 제한", messages[messageType], onPress);
};
