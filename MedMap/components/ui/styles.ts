import { StyleSheet } from "react-native";
import { theme } from "../../theme/theme";

const styles = StyleSheet.create({
  snackbar: {
    borderRadius: 8,
    margin: 8,
  },
  title: {
    fontWeight: "bold",
    color: theme.colors.onSurface,
    marginBottom: 4,
  },
  description: {
    color: theme.colors.onSurfaceVariant,
  },
  destructive: {
    backgroundColor: theme.colors.errorContainer,
  },
  success: {
    backgroundColor: theme.colors.secondaryContainer,
  },
  warning: {
    backgroundColor: theme.colors.error,
  },
  info: {
    backgroundColor: theme.colors.primary,
  },
  default: {
    backgroundColor: theme.colors.surface,
  },
});

export default styles;
