import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Users, Clock } from "lucide-react-native";
import { colors } from "../_layout";

const communityData = [
  { id: "1", username: "小明", duration: "16 小时 23 分", completedAt: "今天 08:00" },
  { id: "2", username: "阿花", duration: "18 小时 05 分", completedAt: "今天 07:30" },
  { id: "3", username: "大卫", duration: "16 小时 00 分", completedAt: "昨天 20:00" },
  { id: "4", username: "小红", duration: "17 小时 45 分", completedAt: "昨天 19:30" },
  { id: "5", username: "老王", duration: "20 小时 12 分", completedAt: "昨天 18:00" },
];

export default function CommunityScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Users size={24} color={colors.accent} strokeWidth={1.5} />
          <Text style={styles.title}>社区动态</Text>
        </View>

        <Text style={styles.subtitle}>看看其他人的断食记录，一起坚持</Text>

        {communityData.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.username.charAt(0)}</Text>
            </View>

            <View style={styles.userInfo}>
              <Text style={styles.username}>{item.username}</Text>
              <View style={styles.timeRow}>
                <Clock size={12} color={colors.muted} strokeWidth={1.5} />
                <Text style={styles.timeText}>{item.completedAt}</Text>
              </View>
            </View>

            <View style={styles.durationBadge}>
              <Text style={styles.durationText}>{item.duration}</Text>
            </View>
          </View>
        ))}

        <View style={styles.spacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: "NotoSansSC-Bold",
    color: colors.text,
    marginLeft: 12,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "NotoSansSC-Regular",
    color: colors.muted,
    marginBottom: 24,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 140, 105, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  avatarText: {
    fontSize: 18,
    fontFamily: "NotoSansSC-Bold",
    color: colors.accent,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontFamily: "NotoSansSC-Medium",
    color: colors.text,
    marginBottom: 4,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeText: {
    fontSize: 12,
    fontFamily: "NotoSansSC-Regular",
    color: colors.muted,
    marginLeft: 4,
  },
  durationBadge: {
    backgroundColor: "rgba(255, 140, 105, 0.1)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  durationText: {
    fontSize: 14,
    fontFamily: "NotoSansSC-Medium",
    color: colors.accent,
  },
  spacer: {
    height: 32,
  },
});
