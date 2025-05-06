import React from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  ImageSourcePropType,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "react-native-paper";

type BadgePosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

type AvatarProps = {
  source?: ImageSourcePropType;
  fallback?: string;
  size?: number;
  shape?: "circle" | "square";
  isOnline?: boolean;
  badgeColor?: string;
  badgePosition?: BadgePosition;
  onPress?: () => void;
  loading?: boolean;
};

export const Avatar = ({
  source,
  fallback,
  size = 40,
  shape = "circle",
  isOnline = false,
  badgeColor = "#4ADE80",
  badgePosition = "bottom-right",
  onPress,
  loading = false,
}: AvatarProps) => {
  const { colors } = useTheme();
  const borderRadius = shape === "circle" ? size / 2 : 8;

  const Wrapper = onPress ? TouchableOpacity : View;

  const getBadgeStyle = (): any => {
    const baseStyle = {
      backgroundColor: badgeColor,
      width: size * 0.25,
      height: size * 0.25,
      borderRadius: (size * 0.25) / 2,
      position: "absolute",
      borderWidth: 2,
      borderColor: "#fff",
    };

    const positions: Record<BadgePosition, any> = {
      "top-left": { top: size * 0.05, left: size * 0.05 },
      "top-right": { top: size * 0.05, right: size * 0.05 },
      "bottom-left": { bottom: size * 0.05, left: size * 0.05 },
      "bottom-right": { bottom: size * 0.05, right: size * 0.05 },
    };

    return { ...baseStyle, ...positions[badgePosition] };
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View
          style={[
            styles.loadingSkeleton,
            { borderRadius, backgroundColor: colors.backdrop },
          ]}
        />
      );
    }

    if (source) {
      return (
        <Image
          source={source}
          style={{ width: size, height: size, borderRadius }}
          resizeMode="cover"
        />
      );
    }

    return (
      <View
        style={[
          styles.fallback,
          { backgroundColor: colors.backdrop, borderRadius },
        ]}
      >
        <Text style={styles.fallbackText}>{fallback?.[0]?.toUpperCase() || "?"}</Text>
      </View>
    );
  };

  return (
    <Wrapper onPress={onPress} style={{ width: size, height: size }}>
      <View style={[styles.container, { width: size, height: size, borderRadius }]}>
        {renderContent()}
        {isOnline && <View style={getBadgeStyle()} />}
      </View>
    </Wrapper>
  );
};
const styles = StyleSheet.create({
    container: {
      overflow: "hidden",
      alignItems: "center",
      justifyContent: "center",
    },
    fallback: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    fallbackText: {
      color: "#fff",
      fontWeight: "bold",
    },
    loadingSkeleton: {
      width: "100%",
      height: "100%",
    },
  });
  