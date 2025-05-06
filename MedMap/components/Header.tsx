import React from 'react';
import { Appbar, useTheme } from 'react-native-paper';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';

interface HeaderProps extends Partial<NativeStackHeaderProps> {
  title: string;
  showBackAction?: boolean;
  rightAction?: React.ReactNode;
  leftIcon?: string; // use string for icon name
  onLeftIconPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBackAction = false,
  navigation,
  rightAction,
  leftIcon,
  onLeftIconPress,
}) => {
  const theme = useTheme();

  return (
    <Appbar.Header style={{ backgroundColor: theme.colors.surface, elevation: 0 }}>
      {showBackAction && navigation ? (
        <Appbar.BackAction onPress={() => navigation.goBack()} />
      ) : leftIcon ? (
        <Appbar.Action icon={leftIcon} onPress={onLeftIconPress} />
      ) : null}

      <Appbar.Content title={title} titleStyle={{ fontWeight: 'bold' }} />

      {rightAction}
    </Appbar.Header>
  );
};

export default Header;
