import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Checkbox as PaperCheckbox } from "react-native-paper";

type CheckboxProps = {
  status: "checked" | "unchecked" | "indeterminate";
  onPress: () => void;
  disabled?: boolean;
  style?: object;
};

const Checkbox = React.forwardRef<View, CheckboxProps>(
  ({ status, onPress, disabled, style }, ref) => {
    return (
      <View ref={ref} style={[styles.container, style]}>
        <PaperCheckbox
          status={status}
          onPress={onPress}
          disabled={disabled}
          color="#3b82f6" // equivalent to Tailwind's 'text-primary' / blue-500
          uncheckedColor="#d1d5db" // Tailwind's 'border' color / gray-300
        />
      </View>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
const styles = StyleSheet.create({
  container: {
    width: 20,  // similar to Tailwind `w-4` = 16, Paper is slightly larger
    height: 20, // similar to Tailwind `h-4`
    justifyContent: "center",
    alignItems: "center",
  },
});
