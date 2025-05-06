import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { theme } from '../theme/theme';

// Common styles that can be reused across components
export const commonStyles = StyleSheet.create({
  // Layout
  container: {
    flex: 1,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Typography
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 16,
  },
  subheading: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: theme.colors.text,
  },
  smallText: {
    fontSize: 14,
    color: theme.colors.onSurface,
  },
  
  // Elements
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});

// Helper function to merge styles
export function mergeStyles(...styles: (ViewStyle | TextStyle | ImageStyle)[]) {
  return StyleSheet.flatten(styles.filter(Boolean));
}
