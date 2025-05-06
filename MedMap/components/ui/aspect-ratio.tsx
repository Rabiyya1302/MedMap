import React from "react";
import { View, StyleSheet } from "react-native";

type AspectRatioProps = {
  ratio?: number; // width / height
  children: React.ReactNode;
  style?: any;
};

export const AspectRatio = ({ ratio = 1, children, style }: AspectRatioProps) => {
  return (
    <View style={[styles.container, { aspectRatio: ratio }, style]}>
      {children}
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
      width: "100%",
      overflow: "hidden",
    },
  });
  