import { Tabs } from "expo-router";
import { View, StyleSheet } from "react-native";
import { Home, Users, User } from "lucide-react-native";
import { colors } from "../_layout";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "断食",
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <Home size={size} color={color} strokeWidth={1.5} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: "社区",
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <Users size={size} color={color} strokeWidth={1.5} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "我的",
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <User size={size} color={color} strokeWidth={1.5} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
    height: 80,
    paddingBottom: 24,
    paddingTop: 12,
  },
  tabLabel: {
    fontFamily: "NotoSansSC-Medium",
    fontSize: 11,
    marginTop: 4,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
