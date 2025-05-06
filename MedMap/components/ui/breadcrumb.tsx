import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "react-native-vector-icons";

interface BreadcrumbProps {
  separator?: React.ReactNode;
  children: React.ReactNode;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ separator, children }) => {
  return (
    <View style={styles.breadcrumbContainer}>
      {React.Children.map(children, (child, index) => {
        return React.cloneElement(child, {
          separator,
          isLastItem: index === React.Children.count(children) - 1,
        });
      })}
    </View>
  );
};

const BreadcrumbList: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <View style={styles.breadcrumbList}>{children}</View>;
};

const BreadcrumbItem: React.FC<{
  children: React.ReactNode;
  isLastItem?: boolean;
  separator?: React.ReactNode;
}> = ({ children, isLastItem, separator }) => {
  return (
    <View style={styles.breadcrumbItem}>
      {isLastItem ? (
        <Text style={styles.breadcrumbText}>{children}</Text>
      ) : (
        <TouchableOpacity>
          <Text style={styles.breadcrumbText}>{children}</Text>
        </TouchableOpacity>
      )}
      {!isLastItem && separator}
    </View>
  );
};

const BreadcrumbSeparator: React.FC<{ separator?: React.ReactNode }> = ({ separator }) => {
  return <Text style={styles.separator}>{separator || ">"}</Text>;
};

const BreadcrumbPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Text style={styles.breadcrumbPage}>{children}</Text>;
};

export { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbPage, BreadcrumbSeparator };

const styles = StyleSheet.create({
    breadcrumbContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 12,
      marginVertical: 8,
    },
    breadcrumbList: {
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
    },
    breadcrumbItem: {
      flexDirection: "row",
      alignItems: "center",
    },
    breadcrumbText: {
      fontSize: 14,
      color: "#6200ee", // Default primary color from theme
      fontWeight: "500",
    },
    breadcrumbPage: {
      fontSize: 14,
      color: "#000000",
      fontWeight: "400",
    },
    separator: {
      fontSize: 14,
      marginHorizontal: 4,
      color: "#6200ee", // Default separator color from theme
    },
  });
  