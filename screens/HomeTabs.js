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
import Icon from "@expo/vector-icons/Ionicons";

import Logo from "../assets/images/logo.svg";

import PatientHomeScreen from "./Patient/PHomeScreen";
import CaregiverHomeScreen from "./Caregiver/CHomeScreen";
import AspiringCaregiverHomeScreen from "./AspiringCaregiver/ACHomeScreen";

import ProfileScreen from "./ProfileScreen";
import SearchScreen from "./SearchScreen";
import ChatScreen from "./ChatScreen";
import SettingsScreen from "./SettingsScreen";

const Tab = createBottomTabNavigator();

export default function HomeTabs({ userType }) {
  // userType에 따른 페이지 분류
  const [HomeComponent, setHomeComponent] = useState(null);

  useEffect(() => {
    if (userType === "Patient") {
      setHomeComponent(() => PatientHomeScreen);
    } else if (userType === "Caregiver") {
      setHomeComponent(() => CaregiverHomeScreen);
    } else {
      setHomeComponent(() => AspiringCaregiverHomeScreen);
    }
  }, [userType]);

  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName = "";

            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Profile") {
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
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        {HomeComponent !== null && (
          <Tab.Screen
            name="Home"
            component={HomeComponent}
            options={{
              header: () => (
                <View style={styles.customHeader}>
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
        )}
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Chat" component={ChatScreen} />
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
    justifyContent: "space-between",
    backgroundColor: "white",
    borderBottomWidth: 0,
    alignItems: "center",
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  iconWrapper: {
    flexDirection: "row",
    alignItems: "center",
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
