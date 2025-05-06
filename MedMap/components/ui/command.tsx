import React, { useState } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { Dialog, Portal } from "react-native-paper";
import { Search } from "lucide-react-native";

type CommandItemType = {
  label: string;
  shortcut?: string;
  disabled?: boolean;
};

type CommandDialogProps = {
  visible: boolean;
  onDismiss: () => void;
  items: CommandItemType[];
  onSelect: (item: CommandItemType) => void;
};

export const CommandDialog = ({
  visible,
  onDismiss,
  items,
  onSelect,
}: CommandDialogProps) => {
  const [search, setSearch] = useState("");

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} style={styles.dialog}>
        <View style={styles.inputWrapper}>
          <Search size={18} color="#888" style={styles.icon} />
          <TextInput
            placeholder="Search..."
            value={search}
            onChangeText={setSearch}
            style={styles.input}
            placeholderTextColor="#888"
          />
        </View>

        {filteredItems.length === 0 ? (
          <Text style={styles.empty}>No results found.</Text>
        ) : (
          <FlatList
            data={filteredItems}
            keyExtractor={(item) => item.label}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => onSelect(item)}
                disabled={item.disabled}
              >
                <Text
                  style={[
                    styles.itemText,
                    item.disabled && { opacity: 0.5 },
                  ]}
                >
                  {item.label}
                </Text>
                {item.shortcut && (
                  <Text style={styles.shortcut}>{item.shortcut}</Text>
                )}
              </TouchableOpacity>
            )}
            style={styles.list}
          />
        )}
      </Dialog>
    </Portal>
  );
};
const styles = StyleSheet.create({
    dialog: {
      marginHorizontal: 20,
      borderRadius: 12,
    },
    inputWrapper: {
      flexDirection: "row",
      alignItems: "center",
      borderBottomWidth: 1,
      borderColor: "#ccc",
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    icon: {
      marginRight: 8,
    },
    input: {
      flex: 1,
      height: 40,
      fontSize: 16,
      color: "#000",
    },
    list: {
      maxHeight: 300,
    },
    item: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    itemText: {
      fontSize: 16,
      color: "#000",
    },
    shortcut: {
      fontSize: 12,
      color: "#999",
    },
    empty: {
      textAlign: "center",
      padding: 20,
      fontSize: 14,
      color: "#999",
    },
  });
  