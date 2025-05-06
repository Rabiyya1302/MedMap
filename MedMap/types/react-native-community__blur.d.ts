declare module '@react-native-community/blur' {
    import { ViewProps } from 'react-native';

    export interface BlurViewProps extends ViewProps {
        blurType?: 'dark' | 'light' | 'xlight' | 'prominent' | 'regular' | 'extraDark';
        blurAmount?: number;
        reducedTransparencyFallbackColor?: string;
    }

    export class BlurView extends React.Component<BlurViewProps> {}
    export class VibrancyView extends React.Component<BlurViewProps> {}
} 