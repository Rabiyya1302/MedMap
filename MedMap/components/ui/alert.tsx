import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";
import { IconProps } from "react-native-paper/lib/typescript/components/MaterialCommunityIcon";

type AlertProps = {
  variant?: "default" | "destructive";
  title: string;
  description?: string;
  icon?: React.ReactElement<IconProps>;
};

export const Alert = ({
  variant = "default",
  title,
  description,
  icon,
}: AlertProps) => {
  const { colors } = useTheme();

  const isDestructive = variant === "destructive";

  const borderColor = isDestructive ? colors.error : colors.outline;
  const backgroundColor = isDestructive
    ? colors.errorContainer ?? "#fef2f2"
    : colors.background;

  return (
    <Card style={[styles.card, { borderColor, backgroundColor }]}>
      <View style={styles.container}>
        {icon && <View style={styles.icon}>{icon}</View>}
        <View style={styles.textContent}>
          <Text
            variant="titleMedium"
            style={[styles.title, isDestructive && { color: colors.error }]}
          >
            {title}
          </Text>
          {description && (
            <Text
              variant="bodyMedium"
              style={[
                styles.description,
                isDestructive && { color: colors.error },
              ]}
            >
              {description}
            </Text>
          )}
        </View>
      </View>
    </Card>
  );
};
const styles = StyleSheet.create({
    card: {
      borderWidth: 1,
      borderRadius: 12,
      padding: 16,
      marginVertical: 8,
    },
    container: {
      flexDirection: "row",
      alignItems: "flex-start",
    },
    icon: {
      marginRight: 12,
      marginTop: 4,
    },
    textContent: {
      flex: 1,
    },
    title: {
      marginBottom: 4,
    },
    description: {
      lineHeight: 20,
    },
  });
  