import React from "react"
import { View, StyleSheet } from "react-native"
import { Menu, Divider, Text, IconButton, useTheme } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"

type DropdownMenuItem = {
  label: string
  onPress: () => void
  icon?: string
  disabled?: boolean
}

type DropdownMenuProps = {
  triggerIcon?: string
  items: DropdownMenuItem[]
  label?: string
  children?: React.ReactNode
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  triggerIcon = "dots-vertical",
  items,
  label,
  children,
}) => {
  const [visible, setVisible] = React.useState(false)
  const theme = useTheme()

  const openMenu = () => setVisible(true)
  const closeMenu = () => setVisible(false)

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          children ? (
            <View>{children}</View>
          ) : (
            <IconButton icon={triggerIcon} onPress={openMenu} />
          )
        }
        contentStyle={styles.menuContent}
      >
        {label && <Text style={styles.label}>{label}</Text>}

        {items.map((item, index) => (
          <React.Fragment key={index}>
            {item.label === "divider" ? (
              <Divider style={styles.divider} />
            ) : (
              <Menu.Item
                title={item.label}
                onPress={() => {
                  item.onPress()
                  closeMenu()
                }}
                leadingIcon={item.icon ? item.icon : undefined}
                disabled={item.disabled}
              />
            )}
          </React.Fragment>
        ))}
      </Menu>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  label: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    fontWeight: "600",
    fontSize: 14,
    opacity: 0.7,
  },
  divider: {
    marginVertical: 4,
  },
  menuContent: {
    borderRadius: 8,
    paddingVertical: 4,
  },
})
