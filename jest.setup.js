import '@testing-library/jest-native/extend-expect';

// Mock react-native-maps
jest.mock('react-native-maps', () => {
  const { View } = require('react-native');
  const MockMapView = (props) => {
    return <View testID="map-container" {...props} />;
  };
  MockMapView.Marker = View;
  MockMapView.Heatmap = View;
  MockMapView.Circle = View;
  return {
    __esModule: true,
    default: MockMapView,
    Marker: View,
    Heatmap: View,
    Circle: View,
    PROVIDER_GOOGLE: 'google',
  };
});

// Mock react-native-blur
jest.mock('@react-native-community/blur', () => ({
  BlurView: 'BlurView',
}));

// Mock react-native-chart-kit
jest.mock('react-native-chart-kit', () => ({
  LineChart: 'LineChart',
})); 