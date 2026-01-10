import { View, Text, Modal, Pressable, Animated, StyleSheet } from "react-native";
import { useEffect, useRef } from "react";
import { colors } from "@/app/_layout";

interface ConfirmModalProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  visible,
  title,
  message,
  confirmText = "确认",
  cancelText = "取消",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const scale = useRef(new Animated.Value(0.9)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scale, {
          toValue: 1,
          tension: 150,
          friction: 15,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 0.9,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Modal transparent visible={visible} animationType="none">
      <Animated.View style={[styles.overlay, { opacity }]}>
        <Pressable style={styles.backdrop} onPress={onCancel} />
        
        <Animated.View
          style={[
            styles.modal,
            {
              transform: [{ scale }],
              opacity,
            },
          ]}
        >
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          
          <View style={styles.buttonRow}>
            <Pressable onPress={onCancel} style={styles.cancelButton}>
              <Text style={styles.cancelText}>{cancelText}</Text>
            </Pressable>
            
            <Pressable onPress={onConfirm} style={styles.confirmButton}>
              <Text style={styles.confirmText}>{confirmText}</Text>
            </Pressable>
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  modal: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 24,
    marginHorizontal: 32,
    padding: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: "NotoSansSC-Bold",
    color: colors.text,
    textAlign: "center",
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    fontFamily: "NotoSansSC-Regular",
    color: colors.muted,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 16,
  },
  cancelButton: {
    flex: 1,
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelText: {
    fontSize: 16,
    fontFamily: "NotoSansSC-Medium",
    color: colors.muted,
  },
  confirmButton: {
    flex: 1,
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmText: {
    fontSize: 16,
    fontFamily: "NotoSansSC-Medium",
    color: colors.white,
  },
});
