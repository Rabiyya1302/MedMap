import * as React from "react";
import { ViewStyle, TextStyle } from "react-native";
import {
  Button as PaperButton,
  ActivityIndicator,
  Text,
  useTheme,
} from "react-native-paper";

type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
type ButtonSize = "default" | "sm" | "lg" | "icon";

export interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  variant = "default",
  size = "default",
  disabled = false,
  loading = false,
  style,
  textStyle,
  leftIcon,
  rightIcon,
}) => {
  const theme = useTheme();

  const getMode = () => {
    switch (variant) {
      case "outline":
        return "outlined";
      case "ghost":
      case "link":
        return "text";
      default:
        return "contained";
    }
  };

  const getButtonStyle = (): ViewStyle => {
    const sizeStyles: Record<ButtonSize, ViewStyle> = {
      default: { height: 40, paddingHorizontal: 16 },
      sm: { height: 36, paddingHorizontal: 12 },
      lg: { height: 44, paddingHorizontal: 24 },
      icon: { height: 40, width: 40, padding: 0 },
    };

    return {
      borderRadius: 8,
      backgroundColor:
        variant === "destructive"
          ? theme.colors.error
          : variant === "secondary"
          ? theme.colors.secondaryContainer
          : undefined,
      opacity: disabled ? 0.5 : 1,
      ...sizeStyles[size],
      ...(style || {}),
    };
  };

  const getLabelStyle = (): TextStyle => {
    const baseColor =
      variant === "outline" || variant === "ghost"
        ? theme.colors.primary
        : variant === "link"
        ? theme.colors.primary
        : theme.colors.onPrimary;

    return {
      color: variant === "link" ? theme.colors.primary : baseColor,
      textDecorationLine: variant === "link" ? "underline" : "none",
      fontSize: 16,
      fontWeight: "500",
      ...(textStyle || {}),
    };
  };

  return (
    <PaperButton
      mode={getMode()}
      onPress={onPress}
      disabled={disabled || loading}
      style={getButtonStyle()}
      contentStyle={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
      labelStyle={getLabelStyle()}
      uppercase={false}
      icon={leftIcon ? () => leftIcon : undefined}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={
            variant === "default" || variant === "destructive"
              ? theme.colors.onPrimary
              : theme.colors.primary
          }
          style={{ marginRight: 8 }}
        />
      ) : typeof children === "string" ? (
        <Text style={getLabelStyle()}>{children}</Text>
      ) : (
        children
      )}
      {!loading && rightIcon}
    </PaperButton>
  );
};
