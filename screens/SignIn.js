import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Logo from "../assets/images/logo.svg";
import { signInScreenStyle } from "../styles/globalStyles";
import { setUserRole } from "../utils/storage";
import { dataPerUserRole } from "../utils/dataPerUserRole";

export default function SignIn() {
  const navigation = useNavigation();

  const moveSignInPerRole = async (userRole, userRoleIndex, moveToPage) => {
    try {
      await setUserRole(userRole);
      console.log("sign in page : " + userRole);
      navigation.navigate(moveToPage, {
        userRole: userRole,
        userRoleIndex: userRoleIndex,
      });
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
