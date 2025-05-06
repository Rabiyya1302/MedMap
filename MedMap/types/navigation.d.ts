import '@react-navigation/native';

// Extend the Navigator type to avoid TS2741 error
declare module '@react-navigation/native' {
  export interface NavigatorProps {
    id?: string;
  }
}
