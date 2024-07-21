import React, { useState, useEffect } from "react";
import { StyleSheet, Text, StatusBar, ActivityIndicator } from "react-native";
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import {
  getUserRole,
  getUserRoleIndex,
  setAutoSignedIn,
  getAutoSignedIn,
} from "./utils/storage";
import { Color } from "./styles/color";
import { AuthProvider } from "./contexts/AuthContext";

import AsyncStorage from "@react-native-async-storage/async-storage";

import SignIn from "./screens/SignIn";
import SignInCaregiver from "./components/SignInCaregiver";
import SignInPatient from "./components/SignInPatient";
import UploadCertificate from "./components/UploadCertificate";
import HomeTabs from "./screens/HomeTabs";
import CaregiverSearchEducation from "./screens/Caregiver/CaregiverSearchEducation";
import MapScreen from "./screens/MapScreen";
import CaregiverMyPageEdit from "./screens/Caregiver/CaregiverMyPageEdit";
import PatientMyPageEdit from "./screens/Patient/PatientMyPageEdit";
import PatientScheduleTimeScreen from "./screens/Patient/PatientScheduleTimeScreen";
import PatientScheduleNoteScreen from "./screens/Patient/PatientScheduleNoteScreen";
import ChatScreen from "./screens/ChatScreen";
import ReviewScreen from "./screens/ReviewScreen";
import CaregiverSearchScreen from "./screens/Caregiver/CaregiverSearchScreen";
import CommunityPostScreen from "./screens/CommunityPostScreen";
import PatientMyPageScreen from "./screens/Patient/PatientMyPageScreen";
import PatientSearchCaregiver from "./screens/Patient/PatientSearchCaregiver";
import CaregiverMyPageScreen from "./screens/Caregiver/CaregiverMyPageScreen";

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();

function AuthNavigator() {
  console.log("로그인 페이지 라우팅");
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="SignIn" component={SignIn} />
      <AuthStack.Screen name="SignInCaregiver" component={SignInCaregiver} />
      <AuthStack.Screen
        name="UploadCertificate"
        component={UploadCertificate}
      />
      <AuthStack.Screen name="SignInPatient" component={SignInPatient} />
    </AuthStack.Navigator>
  );
}

export default function App() {
  const [userRole, setUserRole] = useState(null);
  const [userRoleIndex, setUserRoleIndex] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);

  // 로그인 정보 초기화
  useEffect(() => {
    const clearStorage = async () => {
      try {
        await AsyncStorage.clear();
        console.log("AsyncStorage cleared");
      } catch (e) {
        console.error("Failed to clear AsyncStorage:", e);
      }
    };

    clearStorage();
  }, []);

  const handleSignIn = (role, roleIndex) => {
    setUserRole(role);
    setUserRoleIndex(roleIndex);
    setIsSignedIn(true);
    setAutoSignedIn(true);
  };

  const fetchUserRole = async () => {
    try {
      const role = await getUserRole();
      const roleIndex = await getUserRoleIndex();
      const signedIn = await getAutoSignedIn();

      setUserRole(role || false);
      setUserRoleIndex(roleIndex);
      setIsSignedIn(signedIn || false);
      // setUserRole("Caregiver");
      // setUserRoleIndex(0);
      // setIsSignedIn(true);
    } catch (error) {
      console.log(error);
      setUserRole(false);
      setUserRoleIndex(-1);
      setIsSignedIn(false);
    }
  };

  useEffect(() => {
    fetchUserRole();
  }, []);

  // useEffect(() => {
  //   console.log("app.js 페이지 userRole: " + userRole);
  //   console.log("app.js 페이지 userRoleIndex: " + userRoleIndex);
  //   console.log("app.js 페이지 isSignedIn: " + isSignedIn);
  // }, [isSignedIn]);

  if (isSignedIn === null) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator size="large" color={Color.pink900} />
        <Text>로딩중</Text>
      </SafeAreaView>
    );
  }
  // if (!isLoading) {
  //   console.log("로딩 끝남");
  // }

  return (
    <>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      {/* <SafeAreaView style={styles.safeArea}> */}
      <SafeAreaProvider style={{ flex: 1 }} edges={["right", "bottom", "left"]}>
        <AuthProvider handleSignIn={handleSignIn}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              {isSignedIn === true ? (
                <>
                  <Stack.Screen
                    name="HomeTabs"
                    component={HomeTabs}
                    initialParams={{ userRole, userRoleIndex }}
                  />
                  <Stack.Screen
                    name="CommunityPostScreen"
                    component={CommunityPostScreen}
                  />
                  <Stack.Screen
                    name="ReviewScreen"
                    component={ReviewScreen}
                    // initialParams={{ myReviewPage: true }}
                  />
                  <Stack.Screen
                    name="CaregiverSearchScreen"
                    component={CaregiverSearchScreen}
                    initialParams={{ needHeader: true }}
                  />

                  <Stack.Screen
                    name="PatientSearchCaregiver"
                    component={PatientSearchCaregiver}
                    initialParams={{ needHeader: true }}
                  />
                  <Stack.Screen
                    name="CaregiverMyPageScreen"
                    component={CaregiverMyPageScreen}
                    initialParams={{ fromFindCaregiver: true }}
                  />
                  <Stack.Screen
                    name="PatientMyPageScreen"
                    component={PatientMyPageScreen}
                    initialParams={{ fromFindPatient: true }}
                  />
                  <Stack.Screen
                    name="CaregiverSearchEducation"
                    component={CaregiverSearchEducation}
                  />
                  <Stack.Screen
                    name="CaregiverMyPageEdit"
                    component={CaregiverMyPageEdit}
                  />
                  <Stack.Screen name="MapScreen" component={MapScreen} />
                  <Stack.Screen
                    name="PatientMyPageEdit"
                    component={PatientMyPageEdit}
                  />
                  <Stack.Screen
                    name="PatientScheduleTimeScreen"
                    component={PatientScheduleTimeScreen}
                  />
                  <Stack.Screen
                    name="PatientScheduleNoteScreen"
                    component={PatientScheduleNoteScreen}
                  />
                  <Stack.Screen name="ChatScreen" component={ChatScreen} />
                </>
              ) : (
                <Stack.Screen name="Auth" component={AuthNavigator} />
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </AuthProvider>
      </SafeAreaProvider>
      {/* </SafeAreaView> */}
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: "100%",
  },
});
