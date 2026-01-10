import { useEffect, useState, useRef } from "react";
import { View, Text, Pressable, Animated, Easing, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Play, Square } from "lucide-react-native";
import { useTimerStore, FASTING_PHASES } from "@/store/useTimerStore";
import ConfirmModal from "@/components/ConfirmModal";
import { colors } from "../_layout";

// 格式化时间显示
function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

export default function HomeScreen() {
  const {
    isRunning,
    startTime,
    targetDuration,
    startFasting,
    stopFasting,
    getElapsedTime,
    getProgress,
    getCurrentPhase,
  } = useTimerStore();

  // 本地状态
  const [elapsed, setElapsed] = useState(0);
  const [showStopModal, setShowStopModal] = useState(false);
  const [isLongPressing, setIsLongPressing] = useState(false);

  // 动画值
  const longPressProgress = useRef(new Animated.Value(0)).current;
  const pulseScale = useRef(new Animated.Value(1)).current;
  const pulseOpacity = useRef(new Animated.Value(0.3)).current;

  // 更新计时器
  useEffect(() => {
    if (!isRunning) {
      setElapsed(0);
      return;
    }
    const interval = setInterval(() => {
      setElapsed(getElapsedTime());
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, getElapsedTime]);

  // 脉冲动画
  useEffect(() => {
    if (isRunning) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseScale, {
            toValue: 1.05,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseScale, {
            toValue: 1,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseOpacity, {
            toValue: 0.5,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseOpacity, {
            toValue: 0.2,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseScale.setValue(1);
      pulseOpacity.setValue(0.3);
    }
  }, [isRunning]);

  // 长按处理
  const handlePressIn = () => {
    setIsLongPressing(true);
    Animated.timing(longPressProgress, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        startFasting();
        setIsLongPressing(false);
        longPressProgress.setValue(0);
      }
    });
  };

  const handlePressOut = () => {
    setIsLongPressing(false);
    longPressProgress.stopAnimation();
    Animated.timing(longPressProgress, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const currentPhase = isRunning ? getCurrentPhase() : FASTING_PHASES[0];
  const progress = isRunning ? getProgress() : 0;
  const progressPercent = Math.round(progress * 100);

  // 非计时态
  if (!isRunning) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>SoulFast</Text>
          <Text style={styles.subtitle}>16:8 科学断食 · 轻盈生活</Text>

          <View style={styles.infoCard}>
            <Text style={styles.cardTitle}>什么是 16:8 断食？</Text>
            <Text style={styles.cardText}>
              每天 16 小时停止进食，8 小时内完成饮食。这是一种经过科学验证的间歇性断食方式，有助于改善代谢健康、提升专注力。
            </Text>
          </View>

          <Pressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={styles.startButton}
          >
            <Animated.View
              style={[
                styles.progressFill,
                {
                  width: longPressProgress.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0%", "100%"],
                  }),
                },
              ]}
            />
            <View style={styles.buttonContent}>
              <Play size={20} color={colors.text} strokeWidth={1.5} />
              <Text style={styles.buttonText}>长按开启断食</Text>
            </View>
          </Pressable>

          <Text style={styles.hint}>长按 1.5 秒确认开始</Text>
        </View>
      </SafeAreaView>
    );
  }

  // 计时态
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Animated.View
          style={[
            styles.pulseCircle,
            {
              transform: [{ scale: pulseScale }],
              opacity: pulseOpacity,
            },
          ]}
        />

        <View style={styles.timerContent}>
          <View style={styles.phaseTag}>
            <Text style={styles.phaseText}>{currentPhase.title}</Text>
          </View>

          <Text style={styles.timer}>{formatTime(elapsed)}</Text>
          <Text style={styles.progressText}>{progressPercent}% 完成</Text>
          <Text style={styles.description}>{currentPhase.description}</Text>
          <Text style={styles.target}>目标：{formatTime(targetDuration)}</Text>

          <Pressable
            onPress={() => setShowStopModal(true)}
            style={styles.stopButton}
          >
            <Square size={18} color={colors.accent} strokeWidth={1.5} />
            <Text style={styles.stopButtonText}>结束断食</Text>
          </Pressable>
        </View>
      </View>

      <ConfirmModal
        visible={showStopModal}
        title="确认结束断食？"
        message={
          progressPercent < 100
            ? `当前进度 ${progressPercent}%，提前结束不会计入完成记录。`
            : "恭喜完成今日断食目标！"
        }
        confirmText={progressPercent < 100 ? "确认结束" : "完成"}
        cancelText="继续坚持"
        onConfirm={() => {
          stopFasting();
          setShowStopModal(false);
        }}
        onCancel={() => setShowStopModal(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 32,
    fontFamily: "NotoSansSC-Bold",
    color: colors.text,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "NotoSansSC-Regular",
    color: colors.muted,
    textAlign: "center",
    marginBottom: 48,
  },
  infoCard: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 24,
    padding: 24,
    marginBottom: 48,
    width: "100%",
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: "NotoSansSC-Medium",
    color: colors.text,
    marginBottom: 12,
  },
  cardText: {
    fontSize: 14,
    fontFamily: "NotoSansSC-Regular",
    color: colors.muted,
    lineHeight: 24,
  },
  startButton: {
    width: 256,
    height: 64,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderWidth: 1,
    borderColor: "rgba(212, 163, 115, 0.2)",
    overflow: "hidden",
  },
  progressFill: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: colors.accent,
  },
  buttonContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "NotoSansSC-Medium",
    color: colors.text,
    marginLeft: 12,
  },
  hint: {
    fontSize: 12,
    fontFamily: "NotoSansSC-Regular",
    color: "rgba(212, 163, 115, 0.6)",
    marginTop: 16,
  },
  pulseCircle: {
    position: "absolute",
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: colors.accent,
  },
  timerContent: {
    alignItems: "center",
    zIndex: 10,
  },
  phaseTag: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 24,
  },
  phaseText: {
    fontSize: 14,
    fontFamily: "NotoSansSC-Medium",
    color: colors.accent,
  },
  timer: {
    fontSize: 56,
    fontFamily: "NotoSansSC-Regular",
    color: colors.text,
    letterSpacing: 4,
    marginBottom: 8,
  },
  progressText: {
    fontSize: 18,
    fontFamily: "NotoSansSC-Regular",
    color: colors.muted,
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    fontFamily: "NotoSansSC-Regular",
    color: "rgba(212, 163, 115, 0.8)",
    textAlign: "center",
    maxWidth: 280,
    marginBottom: 48,
  },
  target: {
    fontSize: 12,
    fontFamily: "NotoSansSC-Regular",
    color: "rgba(212, 163, 115, 0.6)",
    marginBottom: 24,
  },
  stopButton: {
    width: 224,
    height: 56,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderWidth: 1,
    borderColor: "rgba(212, 163, 115, 0.2)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  stopButtonText: {
    fontSize: 16,
    fontFamily: "NotoSansSC-Medium",
    color: colors.accent,
    marginLeft: 12,
  },
});
