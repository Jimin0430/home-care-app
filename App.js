import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { getUserRole } from "./utils/storage";

import SignIn from "./screens/SignIn";
import SignInCaregiver from "./components/SignInCaregiver";
import SignInPatient from "./components/SignInPatient";
import UploadCertificate from "./components/UploadCertificate";
import HomeTabs from "./screens/HomeTabs";

const Stack = createStackNavigator();

export default function App() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const role = await getUserRole();
        setUserRole(role || false); // 초기 userRole을 false로 설정, getUserRole에서 값을 받아오면 해당 값으로 업데이트
      } catch (error) {
        console.log(error);
        setUserRole(false); //user-role key값이 존재하지 않는 초기 상태에 대한 처리
      }
    };

    fetchUserRole();
  }, []);

  useEffect(() => {
    console.log("app.js 페이지 " + userRole);
  }, [userRole]);

  // 초기 로딩 화면
  if (userRole === null) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator size="large" color="tomato" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <NavigationContainer>
        {userRole !== false && userRole !== null ? (
          <HomeTabs />
        ) : (
          <Stack.Navigator
            initialRouteName={"SignIn"}
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="SignIn" component={SignIn} />
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
