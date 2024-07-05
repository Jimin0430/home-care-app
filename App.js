import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import SignIn from "./screens/SignIn";
import SignInCaregiver from "./components/SignInCaregiver";
import SignInPatient from "./components/SignInPatient";
import UploadCertificate from "./components/UploadCertificate";
import HomeTabs from "./screens/HomeTabs";

const Stack = createStackNavigator();

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(null);

  const getIsSignedIn = async () => {
    try {
      const userType = await AsyncStorage.getItem("user-role");
      return userType != null ? JSON.parse(userType) : false;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  const checkSignInStatus = async () => {
    const signedIn = await getIsSignedIn();
    setIsSignedIn(signedIn);
  };

  useEffect(() => {
    checkSignInStatus();
  }, []);

  useEffect(() => {
    console.log(isSignedIn);
  }, [isSignedIn]);

  // 초기 로딩 화면
  if (isSignedIn === null) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator size="large" color="tomato" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <NavigationContainer>
        {isSignedIn !== false && isSignedIn !== null ? (
          <HomeTabs userType={isSignedIn} />
        ) : (
          <Stack.Navigator
            initialRouteName={"SignIn"}
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              initialParams={{ isSignedIn }}
            />
            <Stack.Screen name="SignInCaregiver" component={SignInCaregiver} />
            <Stack.Screen
              name="UploadCertificate"
              component={UploadCertificate}
            />
            <Stack.Screen name="SignInPatient" component={SignInPatient} />
            <Stack.Screen name="HomeTabs" component={HomeTabs} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: "center",
  },
});
