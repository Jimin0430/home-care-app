import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import Logo from "../assets/images/logo.svg";
import { signInScreenStyle } from "../styles/globalStyles";

export default function SignIn() {
  const navigation = useNavigation();
  const route = useRoute();
  const isSignedIn = route.params?.isSignedIn;

  return (
    <View style={signInScreenStyle.container}>
      <Logo width={60} height={60} />
      <Text style={signInScreenStyle.title}> 안녕하세요! 당신은...</Text>
      <View style={signInScreenStyle.buttonContainer}>
        <TouchableOpacity
          style={signInScreenStyle.textBox}
          onPress={() =>
            navigation.navigate("SignInCaregiver", { userType: "Caregiver" })
          }
        >
          <Text style={signInScreenStyle.subTitle}>요양사에요</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={signInScreenStyle.textBox}
          onPress={() =>
            navigation.navigate("SignInPatient", { userType: "Patient" })
          }
        >
          <Text style={signInScreenStyle.subTitle}>환자에요</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={signInScreenStyle.textBox}
          onPress={() =>
            navigation.navigate("SignInCaregiver", {
              userType: "AspiringCaregiver",
            })
          }
        >
          <Text style={signInScreenStyle.subTitle}>요양사 지망생이에요</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
