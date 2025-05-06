import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Portal,
  Dialog as PaperDialog,
  Button,
  Text,
  IconButton,
} from "react-native-paper";

type DialogProps = {
  visible: boolean;
  onDismiss: () => void;
  children: React.ReactNode;
};

const Dialog = ({ visible, onDismiss, children }: DialogProps) => (
  <Portal>
    <PaperDialog visible={visible} onDismiss={onDismiss} style={styles.dialog}>
      {children}
    </PaperDialog>
  </Portal>
);

const DialogTrigger = ({
  onPress,
  children,
}: {
  onPress: () => void;
  children: React.ReactNode;
}) => (
  <Button onPress={onPress} mode="contained">
    {children}
  </Button>
);

const DialogHeader = ({ children }: { children: React.ReactNode }) => (
  <PaperDialog.Title>{children}</PaperDialog.Title>
);

const DialogContent = ({ children }: { children: React.ReactNode }) => (
  <PaperDialog.Content>{children}</PaperDialog.Content>
);

const DialogFooter = ({ children }: { children: React.ReactNode }) => (
  <PaperDialog.Actions>{children}</PaperDialog.Actions>
);

const DialogTitle = ({ children }: { children: React.ReactNode }) => (
  <Text style={styles.title}>{children}</Text>
);

const DialogDescription = ({ children }: { children: React.ReactNode }) => (
  <Text style={styles.description}>{children}</Text>
);

const DialogClose = ({
  onClose,
}: {
  onClose: () => void;
}) => (
  <IconButton
    icon="close"
    size={20}
    onPress={onClose}
    style={styles.closeButton}
  />
);

const styles = StyleSheet.create({
  dialog: {
    marginHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 4,
    paddingTop: 4,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: 0,
    margin: 8,
    zIndex: 10,
  },
});

export {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
};
