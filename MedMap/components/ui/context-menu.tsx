import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Menu, Divider, Checkbox, RadioButton, Text, IconButton } from "react-native-paper";
import { ChevronRight } from "lucide-react-native";

type ContextMenuItemProps = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  inset?: boolean;
  shortcut?: string;
};

const ContextMenuItem = ({ title, onPress, disabled, inset, shortcut }: ContextMenuItemProps) => (
  <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.menuItem, inset && styles.inset]}>
    <Text style={styles.menuText}>{title}</Text>
    {shortcut && <Text style={styles.shortcut}>{shortcut}</Text>}
  </TouchableOpacity>
);

type ContextMenuCheckboxItemProps = {
  label: string;
  status: boolean;
  onToggle: () => void;
};

const ContextMenuCheckboxItem = ({ label, status, onToggle }: ContextMenuCheckboxItemProps) => (
  <TouchableOpacity onPress={onToggle} style={styles.menuItem}>
    <Checkbox status={status ? "checked" : "unchecked"} />
    <Text>{label}</Text>
  </TouchableOpacity>
);

type ContextMenuRadioItemProps = {
  label: string;
  value: string;
  selected: string;
  onSelect: (value: string) => void;
};

const ContextMenuRadioItem = ({ label, value, selected, onSelect }: ContextMenuRadioItemProps) => (
  <TouchableOpacity onPress={() => onSelect(value)} style={styles.menuItem}>
    <RadioButton status={selected === value ? "checked" : "unchecked"} />
    <Text>{label}</Text>
  </TouchableOpacity>
);

const ContextMenuSeparator = () => <Divider style={styles.divider} />;

const ContextMenuLabel = ({ text, inset }: { text: string; inset?: boolean }) => (
  <Text style={[styles.label, inset && styles.inset]}>{text}</Text>
);

const ContextMenu = ({
  items,
  triggerLabel = "Open Menu",
}: {
  items: React.ReactNode;
  triggerLabel?: string;
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.wrapper}>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <TouchableOpacity onPress={() => setVisible(true)}>
            <Text>{triggerLabel}</Text>
          </TouchableOpacity>
        }
      >
        {items}
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  menuText: {
    fontSize: 14,
    flex: 1,
  },
  shortcut: {
    fontSize: 12,
    color: "#999",
  },
  inset: {
    paddingLeft: 24,
  },
  divider: {
    marginVertical: 4,
  },
  label: {
    fontWeight: "bold",
    fontSize: 13,
    paddingHorizontal: 12,
    paddingVertical: 6,
    color: "#444",
  },
});

export {
  ContextMenu,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuLabel,
};
