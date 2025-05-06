import { MD3LightTheme } from 'react-native-paper';

// MedMap green healthcare theme
export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#38A169',              // Vibrant healthcare green
    primaryContainer: '#C6F6D5',     // Light mint green
    secondary: '#2F855A',            // Deep calming green
    secondaryContainer: '#E6F4EA',   // Soft light green
    background: '#F0FFF4',           // Very light mint (background)
    surface: '#FFFFFF',              // Clean white cards/surfaces
    error: '#DC2626',                // Red for errors
    text: '#1A202C',                 // Almost black (high contrast)
    outline: '#A0AEC0',              // Gray for borders
    surfaceVariant: '#E2E8F0',       // Light neutral for variant surfaces
    onSurfaceVariant: '#4A5568',     // Medium gray text
    success: '#38A169',              // Success color (used for successful actions)
    warning: '#F6AD55',              // Warning color (used for alerts or warnings)
    info: '#3182CE',                 // Info color (used for informational elements)
    surfaceLevel1: '#E6F4EA',        // Light background for surface level 1 (further emphasis)
    surfaceLevel2: '#F0FFF4',        // Slightly darker background for surface level 2 (for contrast)
  },
  roundness: 10, // Soft, modern corners
};
