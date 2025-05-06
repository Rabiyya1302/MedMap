// Toast.tsx
import React from "react";
import { Snackbar, Text } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { X } from "lucide-react-native"; // Optional: for close icon
import styles from "./styles";

export type ToastVariant = "default" | "destructive" | "success" | "warning" | "info";

export interface ToastProps {
  visible: boolean;
  onDismiss: () => void;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  actionLabel?: string;
  onAction?: () => void;
  duration?: number;
}

const getVariantStyle = (variant: ToastVariant = "default") => {
  switch (variant) {
    case "destructive":
      return styles.destructive;
    case "success":
      return styles.success;
    case "warning":
      return styles.warning;
    case "info":
      return styles.info;
    case "default":
    default:
      return styles.default;
  }
};

const Toast: React.FC<ToastProps> = ({
  visible,
  onDismiss,
  title,
  description,
  variant = "default",
  actionLabel,
  onAction,
  duration = 3000,
}) => {
  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismiss}
      duration={duration}
      style={[styles.snackbar, getVariantStyle(variant)]}
      action={
        actionLabel && onAction
          ? {
              label: actionLabel,
              onPress: onAction,
            }
          : undefined
      }
    >
      <View>
        {title && <Text style={styles.title}>{title}</Text>}
        {description && <Text style={styles.description}>{description}</Text>}
      </View>
    </Snackbar>
  );
};

export default Toast;
