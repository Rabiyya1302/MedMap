import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native'

// Utility function to combine styles
export function cn(...inputs: (ViewStyle | TextStyle | ImageStyle)[]) {
  return StyleSheet.flatten(inputs)
}
