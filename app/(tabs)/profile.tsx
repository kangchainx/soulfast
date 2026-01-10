import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { User, Clock, Target, Flame } from "lucide-react-native";
import { useTimerStore } from "@/store/useTimerStore";
import { colors } from "../_layout";

function formatTotalTime(ms: number): string {
  const hours = Math.floor(ms / (1000 * 60 * 60));
  if (hours < 24) {
    return `${hours} 小时`;
  }
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;
  return `${days} 天 ${remainingHours} 小时`;
}

export default function ProfileScreen() {
  const { totalFastingTime, currentStreak, getWeeklyCompletedSessions } = useTimerStore();

  const weeklyGoal = 7;
  const weeklyCompleted = getWeeklyCompletedSessions();
  const achievementRate = Math.min(100, Math.round((weeklyCompleted / weeklyGoal) * 100));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <User size={24} color={colors.accent} strokeWidth={1.5} />
          <Text style={styles.title}>我的数据</Text>
        </View>

        <Text style={styles.subtitle}>记录你的断食历程</Text>

        {/* 累计时长 */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconCircle}>
              <Clock size={20} color={colors.accent} strokeWidth={1.5} />
            </View>
            <Text style={styles.cardLabel}>累计断食时长</Text>
          </View>
          <Text style={styles.cardValue}>{formatTotalTime(totalFastingTime)}</Text>
        </View>

        {/* 目标达成率 */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconCircle}>
              <Target size={20} color={colors.accent} strokeWidth={1.5} />
            </View>
            <Text style={styles.cardLabel}>周目标达成率</Text>
          </View>
          <View style={styles.valueRow}>
            <Text style={styles.cardValue}>{achievementRate}</Text>
            <Text style={styles.valueUnit}>%</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${achievementRate}%` }]} />
          </View>
          <Text style={styles.progressHint}>
            本周完成 {weeklyCompleted} 次，目标 {weeklyGoal} 次
          </Text>
        </View>

        {/* 连续天数 */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconCircle}>
              <Flame size={20} color={colors.accent} strokeWidth={1.5} />
            </View>
            <Text style={styles.cardLabel}>连续完成天数</Text>
          </View>
          <View style={styles.valueRow}>
            <Text style={styles.cardValue}>{currentStreak}</Text>
            <Text style={styles.valueUnit}>天</Text>
          </View>
          {currentStreak >= 7 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>🎉 连续一周！</Text>
            </View>
          )}
        </View>

        {/* 健康提示 */}
        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>💡 健康提示</Text>
          <Text style={styles.tipText}>
            断食期间请确保充足饮水，如感到不适请立即停止。建议每周至少完成 3-5 次 16:8 断食以获得最佳效果。
          </Text>
        </View>

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
    marginBottom: 32,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 24,
    padding: 24,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 140, 105, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  cardLabel: {
    fontSize: 14,
    fontFamily: "NotoSansSC-Regular",
    color: colors.muted,
  },
  cardValue: {
    fontSize: 32,
    fontFamily: "NotoSansSC-Bold",
    color: colors.text,
  },
  valueRow: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  valueUnit: {
    fontSize: 18,
    fontFamily: "NotoSansSC-Regular",
    color: colors.muted,
    marginLeft: 4,
    marginBottom: 4,
  },
  progressBar: {
    height: 8,
    backgroundColor: "rgba(212, 163, 115, 0.2)",
    borderRadius: 4,
    marginTop: 16,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.accent,
    borderRadius: 4,
  },
  progressHint: {
    fontSize: 12,
    fontFamily: "NotoSansSC-Regular",
    color: "rgba(212, 163, 115, 0.6)",
    marginTop: 8,
  },
  badge: {
    backgroundColor: "rgba(255, 140, 105, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginTop: 12,
  },
  badgeText: {
    fontSize: 12,
    fontFamily: "NotoSansSC-Medium",
    color: colors.accent,
  },
  tipCard: {
    backgroundColor: "rgba(255, 140, 105, 0.05)",
    borderRadius: 24,
    padding: 20,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 140, 105, 0.1)",
  },
  tipTitle: {
    fontSize: 14,
    fontFamily: "NotoSansSC-Medium",
    color: colors.text,
    marginBottom: 8,
  },
  tipText: {
    fontSize: 12,
    fontFamily: "NotoSansSC-Regular",
    color: colors.muted,
    lineHeight: 20,
  },
  spacer: {
    height: 32,
  },
});
