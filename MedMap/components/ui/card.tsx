import * as React from "react";
import { View, ViewStyle, TextStyle } from "react-native";
import {
  Title,
  Paragraph,
  Surface,
  useTheme,
} from "react-native-paper";

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const Card = React.forwardRef<View, CardProps>(({ children, style, ...props }, ref) => {
  const theme = useTheme();
  return (
    <Surface
      ref={ref}
      style={[
        {
          borderRadius: 8,
          backgroundColor: theme.colors.surface,
          elevation: 2,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Surface>
  );
});
Card.displayName = "Card";

interface CardHeaderProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const CardHeader = React.forwardRef<View, CardHeaderProps>(({ children, style, ...props }, ref) => {
  return (
    <View
      ref={ref}
      style={[{ padding: 16, paddingBottom: 0, marginBottom: 6 }, style]}
      {...props}
    >
      {children}
    </View>
  );
});
CardHeader.displayName = "CardHeader";

interface CardTitleProps {
  children: React.ReactNode;
  style?: TextStyle;
}

const CardTitle = ({ children, style, ...props }: CardTitleProps) => {
  return (
    <Title style={[{ fontSize: 18, fontWeight: "600" }, style]} {...props}>
      {children}
    </Title>
  );
};
CardTitle.displayName = "CardTitle";

interface CardDescriptionProps {
  children: React.ReactNode;
  style?: TextStyle;
}

const CardDescription = ({ children, style, ...props }: CardDescriptionProps) => {
  return (
    <Paragraph style={[{ fontSize: 14, marginTop: 4 }, style]} {...props}>
      {children}
    </Paragraph>
  );
};
CardDescription.displayName = "CardDescription";

interface CardContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const CardContent = React.forwardRef<View, CardContentProps>(({ children, style, ...props }, ref) => {
  return (
    <View ref={ref} style={[{ padding: 16, paddingTop: 0 }, style]} {...props}>
      {children}
    </View>
  );
});
CardContent.displayName = "CardContent";

interface CardFooterProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const CardFooter = React.forwardRef<View, CardFooterProps>(({ children, style, ...props }, ref) => {
  return (
    <View
      ref={ref}
      style={[
        {
          padding: 16,
          paddingTop: 0,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
});
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
