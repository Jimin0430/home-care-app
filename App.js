import { StatusBar } from "expo-status-bar";
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native"; //왜 필요함? -> 네비게이션 전체 관리하는 놈
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

import Logo from "./assets/images/logo.svg";

import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SearchScreen from "./screens/SearchScreen";
import ChatScreen from "./screens/ChatScreen";
import SettingsScreen from "./screens/SettingsScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <NavigationContainer>
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
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              header: () => (
                <View style={styles.customHeader}>
                  <View style={styles.iconWrapper}>
                    <Logo width={40} height={40} />
                    <Text style={styles.serviceName}> 케어프렌즈 </Text>
                  </View>

                  <TouchableOpacity style={styles.alarmButton}>
                    <Icon name="notifications" size={24} color="gray" />
                  </TouchableOpacity>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ headerTitle: "Profile" }}
          />
          <Tab.Screen
            name="Search"
            component={SearchScreen}
            options={{ headerTitle: "Search" }}
          />
          <Tab.Screen
            name="Chat"
            component={ChatScreen}
            options={{ headerTitle: "Chat" }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ headerTitle: "Settings" }}
          />
        </Tab.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  customHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
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
    paddingBottom: 5,
  },
  alarmButton: {
    padding: 10,
  },
});
