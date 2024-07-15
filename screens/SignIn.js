import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import Logo from "../assets/images/logo.svg";
import { signInScreenStyle } from "../styles/globalStyles";
import { setUserRole, setUserRoleIndex } from "../utils/storage";
import { dataPerUserRole } from "../utils/dataPerUserRole";

export default function SignIn() {
  const navigation = useNavigation();
  const route = useRoute();
  //
  // const { handleSignIn } = route.params;
  //파라미터로서 전달받음
  const moveSignInPerRole = async (userRole, userRoleIndex, moveToPage) => {
    try {
      //로컬 스토리지에 저장
      await setUserRole(userRole);
      await setUserRoleIndex(userRoleIndex);

      navigation.navigate(moveToPage, {
        userRole: userRole,
        userRoleIndex: userRoleIndex,
      });
      //handleSignIn은 건들지 않음. 여기서 업데이트하면 다음 회원가입 창으로 이동하지 않고, 상태가 업데이트 되면서 app.js에서 홈탭으로 리렌더링 됨
      // App.js의 상태 업데이트 및 HomeTabs로 이동
      // handleSignIn(userRole, userRoleIndex);

      console.log("sign in page : " + userRole);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={signInScreenStyle.container}>
      <Logo width={60} height={60} />
      <Text style={signInScreenStyle.title}> 안녕하세요! 당신은...</Text>
      <View style={signInScreenStyle.buttonContainer}>
        {dataPerUserRole.map((item) => (
          <TouchableOpacity
            key={item.index}
            style={signInScreenStyle.textBox}
            onPress={() =>
              moveSignInPerRole(item.userRole, item.index, item.loginPage)
            }
          >
            <Text style={signInScreenStyle.subTitle}>{item.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
