import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { dataPerUserRole } from "../utils/dataPerUserRole";
import { showRestrictedAccessAlert } from "../components/CustomAlert";
import { showCustomAlert } from "../components/CustomAlert";
import { getUserRole, getUserRoleIndex } from "../utils/storage";
import Icon from "@expo/vector-icons/Ionicons";
import Logo from "../assets/images/logo.svg";

import ChatScreen from "./ChatListScreen";
import SettingsScreen from "./SettingsScreen";
import { Color } from "../styles/color";

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  // userRole에 따른 페이지 분류
  const [userRoleData, setUserRoleData] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userRoleIndex, setUserRoleIndex] = useState(null);

  const fetchUserRole = async () => {
    try {
      const role = await getUserRole();
      const roleIndex = await getUserRoleIndex();

      setUserRole(role);
      setUserRoleIndex(roleIndex);
    } catch (error) {
      console.log(error);
      setUserRole(false);
      setUserRoleIndex(-1);
    }
  };

  useEffect(() => {
    fetchUserRole();
  }, []);

  useEffect(() => {
    const roleData = dataPerUserRole.find(
      (data) => data.index === userRoleIndex
    );
    setUserRoleData(roleData);
  }, [userRoleIndex]); //

  const RESTRICTED_ROUTES = new Set(["My page", "Search", "Chat"]);

  const handleTabPress = useCallback(
    (event, route) => {
      if (userRole !== "AspiringCaregiver") return;
      if (!RESTRICTED_ROUTES.has(route.name)) return;

      event.preventDefault();
      showRestrictedAccessAlert();
    },
    [userRole]
  );

  if (!userRoleData) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const {
    homePage: HomeComponent,
    myPage: MyPageComponent,
    searchPage: SearchComponent,
  } = userRoleData;

  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName = "";

            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "My page") {
              iconName = "person";
            } else if (route.name === "Search") {
              iconName = "search";
            } else if (route.name === "Chat") {
              iconName = "chatbubbles";
            } else if (route.name === "Settings") {
              iconName = "settings";
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: Color.pink900,
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeComponent || (() => null)}
          options={{
            header: () => (
              <View
                style={[
                  styles.customHeader,
                  { justifyContent: "space-between" },
                ]}
              >
                <View style={styles.iconWrapper}>
                  <Logo width={42} height={42} />
                  <Text style={styles.serviceName}> 케어프렌즈 </Text>
                </View>
                <TouchableOpacity style={styles.alarmButton}>
                  <Icon name="notifications" size={24} color="gray" />
                </TouchableOpacity>
              </View>
            ),
            headerStyle: {
              backgroundColor: "white",
            },
          }}
        />

        <Tab.Screen
          name="My page"
          component={MyPageComponent || (() => null)}
          options={({ navigation }) => ({
            header: () => (
              <View
                style={[
                  styles.customHeader,
                  { justifyContent: "space-between" },
                ]}
              >
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => navigation.goBack()}
                >
                  <Icon name="chevron-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>나의 프로필</Text>
                <TouchableOpacity
                  style={styles.menuButton}
                  onPress={() =>
                    showCustomAlert("안내", "곧 추가될 서비스입니다.")
                  }
                >
                  <Icon name="menu" size={24} color="black" />
                </TouchableOpacity>
              </View>
            ),
            headerStyle: {
              backgroundColor: "white",
            },
            tabBarLabel: "My page",
          })}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => handleTabPress(e, route),
          })}
        />

        <Tab.Screen
          name="Search"
          component={SearchComponent || (() => null)}
          options={({ navigation }) => ({
            header: () => (
              <View
                style={[
                  styles.customHeader,
                  { justifyContent: "space-between" },
                ]}
              >
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => navigation.goBack()}
                >
                  <Icon name="chevron-back" size={24} color="black" />
                </TouchableOpacity>
                {userRole === "Caregiver" ? (
                  <Text style={styles.headerTitle}>환자 찾기</Text>
                ) : (
                  <Text style={styles.headerTitle}>요양사 찾기</Text>
                )}
                <TouchableOpacity
                  style={styles.menuButton}
                  onPress={() =>
                    showCustomAlert("안내", "곧 추가될 서비스입니다.")
                  }
                >
                  <Icon name="menu" size={24} color="black" />
                </TouchableOpacity>
              </View>
            ),
            headerStyle: {
              backgroundColor: "white",
            },
            tabBarLabel: "Search",
          })}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => handleTabPress(e, route),
          })}
        />
        <Tab.Screen
          name="Chat"
          component={ChatScreen}
          options={({ navigation }) => ({
            header: () => (
              <View
                style={[
                  styles.customHeader,
                  { justifyContent: "space-between" },
                ]}
              >
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => navigation.goBack()}
                >
                  <Icon name="chevron-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>쪽지함</Text>
                <TouchableOpacity
                  style={styles.menuButton}
                  onPress={() =>
                    showCustomAlert("안내", "곧 추가될 서비스입니다.")
                  }
                >
                  <Icon name="menu" size={24} color="black" />
                </TouchableOpacity>
              </View>
            ),
            headerStyle: {
              backgroundColor: "white",
            },
            tabBarLabel: "Chat",
          })}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => handleTabPress(e, route),
          })}
        />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  customHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderBottomWidth: 0,
    alignItems: "center",
    // paddingTop: StatusBar.currentHeight * 1.3,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "bold",
    padding: 7,
  },
  iconWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  serviceName: {
    fontSize: 18,
    color: "black",
    marginLeft: 6,
    fontWeight: "bold",
    paddingBottom: 7,
  },
  alarmButton: {
    padding: 10,
  },
});
