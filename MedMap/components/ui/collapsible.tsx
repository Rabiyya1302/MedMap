import React, { useState } from "react";
import { TouchableOpacity, View, LayoutAnimation, Platform, UIManager } from "react-native";
import Collapsible from "react-native-collapsible";

// Enable LayoutAnimation for Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const CollapsibleWrapper = ({ open, children }: { open: boolean; children: React.ReactNode }) => {
  return (
    <Collapsible collapsed={!open}>
      {children}
    </Collapsible>
  );
};

const CollapsibleTrigger = ({
  onPress,
  children,
}: {
  onPress: () => void;
  children: React.ReactNode;
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        onPress();
      }}
    >
      {children}
    </TouchableOpacity>
  );
};

export { CollapsibleWrapper as Collapsible, CollapsibleTrigger, Collapsible as CollapsibleContent };
