import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { getUserRole, getUserRoleIndex } from "./utils/storage";
import { Color } from "./styles/color";
import { AuthProvider } from "./contexts/AuthContext";
import { setAutoSignedIn, getAutoSignedIn } from "./utils/storage";

import SignIn from "./screens/SignIn";
import SignInCaregiver from "./components/SignInCaregiver";
import SignInPatient from "./components/SignInPatient";
import UploadCertificate from "./components/UploadCertificate";
import HomeTabs from "./screens/HomeTabs";

import PatientMyPageEdit from "./screens/Patient/PatientMyPageEdit";

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();

function AuthNavigator() {
  // const { handleSignIn } = route.params;
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen
        name="SignIn"
        component={SignIn}
        // initialParams={{ handleSignIn }}
      />
      <AuthStack.Screen
        name="SignInCaregiver"
        component={SignInCaregiver}
        // initialParams={{ handleSignIn }}
      />
      <AuthStack.Screen
        name="UploadCertificate"
        component={UploadCertificate}
        // initialParams={{ handleSignIn }}
      />
      <AuthStack.Screen
        name="SignInPatient"
        component={SignInPatient}
        // initialParams={{ handleSignIn }}
      />
    </AuthStack.Navigator>
  );
}

export default function App() {
  const [userRole, setUserRole] = useState(null);
  const [userRoleIndex, setUserRoleIndex] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(null);

  // 초기 회원가입 후 바로 HomeTab(메인화면)으로 이동해야하는 경우 로그인 정보 전달하여 app.js 리렌더링 -> HomeTab으로 navigate
  const handleSignIn = (role, roleIndex) => {
    setUserRole(role);
    setUserRoleIndex(roleIndex);
    setIsSignedIn(true);
    setAutoSignedIn(true);
  };

  // 회원가입 후 앱에 재접속 하는 경우 로그인 상태 유지
  const fetchUserRole = async () => {
    try {
      const role = await getUserRole();
      const roleIndex = await getUserRoleIndex();
      const signedIn = await getAutoSignedIn();

      setUserRole(role || false); // 초기 userRole을 false로 설정, getUserRole에서 값을 받아오면 해당 값으로 업데이트
      setUserRoleIndex(roleIndex || -1);
      // setUserRole("Caregiver");
      // setUserRoleIndex(0);
      setIsSignedIn(signedIn || false);
    } catch (error) {
      console.log(error);
      setUserRole(false); //user-role key값이 존재하지 않는 초기 상태에 대한 처리
      setUserRoleIndex(-1);
      setIsSignedIn(false);
    }
  };

  useEffect(() => {
    //**재접속 시에는 초기 회원가입으로 인한 자동로그인상태가 해지된 상태임. 이때에 스토리에 저장된 userRole, userRoleIndex를 가져옴
    if (!isSignedIn) {
      fetchUserRole();
    }
  }, [isSignedIn]);

  useEffect(() => {
    console.log("app.js 페이지 " + userRole);
    console.log("app.js 페이지 " + userRoleIndex);
  }, [userRole, userRoleIndex]);

  // 초기 로딩 화면
  if (userRole === null) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator size="large" color={Color.pink900} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <AuthProvider handleSignIn={handleSignIn}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isSignedIn ? (
              <>
                <Stack.Screen
                  name="HomeTabs"
                  component={HomeTabs}
                  initialParams={{ userRole, userRoleIndex }}
                />
                <Stack.Screen
                  name="PatientMyPageEdit"
                  component={PatientMyPageEdit}
                />
              </>
            ) : (
              <Stack.Screen
                name="Auth"
                component={AuthNavigator}
                // initialParams={{ handleSignIn }}
              />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: "center",
  },
});
