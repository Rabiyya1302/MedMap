import React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  iconName?: keyof typeof MaterialCommunityIcons.glyphMap;
  iconColor?: string;
  count?: number;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "default",
  children,
  iconName,
  iconColor,
  count,
  style,
  textStyle,
}) => {
  const { colors } = useTheme();

  const getStyles = (): { container: ViewStyle; text: TextStyle } => {
    switch (variant) {
      case "secondary":
        return {
          container: {
            backgroundColor: colors.secondaryContainer,
            borderColor: "transparent",
          },
          text: {
            color: colors.onSecondaryContainer,
          },
        };
      case "destructive":
        return {
          container: {
            backgroundColor: "#EF4444",
            borderColor: "transparent",
          },
          text: {
            color: "#fff",
          },
        };
      case "outline":
        return {
          container: {
            backgroundColor: "transparent",
            borderColor: colors.outline,
            borderWidth: 1,
          },
          text: {
            color: colors.onSurface,
          },
        };
      default:
        return {
          container: {
            backgroundColor: colors.primary,
            borderColor: "transparent",
          },
          text: {
            color: colors.onPrimary,
          },
        };
    }
  };

  const stylesFromVariant = getStyles();

  return (
    <View style={[styles.badge, stylesFromVariant.container, style]}>
      {iconName && (
        <MaterialCommunityIcons
          name={iconName}
          size={14}
          color={iconColor || stylesFromVariant.text.color}
          style={styles.icon}
        />
      )}
      <Text style={[styles.text, stylesFromVariant.text, textStyle]}>
        {children}
      </Text>
      {typeof count === "number" && (
        <View style={styles.countContainer}>
          <Text style={styles.countText}>{count}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 9999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    alignSelf: "flex-start",
  },
  icon: {
    marginRight: 4,
  },
  text: {
    fontSize: 12,
    fontWeight: "600",
  },
  countContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    marginLeft: 6,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  countText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "black",
  },
});
