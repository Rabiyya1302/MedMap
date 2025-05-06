import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  IconButton,
  Text,
  Portal,
  useTheme,
} from "react-native-paper";
import Modal from "react-native-modal";

type DialogProps = {
  visible: boolean;
  onDismiss: () => void;
  children: React.ReactNode;
};

const Dialog = ({ visible, onDismiss, children }: DialogProps) => {
  const theme = useTheme();

  return (
    <Portal>
      <Modal
        isVisible={visible}
        onBackdropPress={onDismiss}
        onSwipeComplete={onDismiss}
        swipeDirection={["down"]}
        animationIn="zoomIn"
        animationOut="zoomOut"
        backdropTransitionOutTiming={0}
        style={styles.modal}
        useNativeDriver
      >
        <View style={[styles.dialog, { backgroundColor: theme.colors.background }]}>
          {children}
        </View>
      </Modal>
    </Portal>
  );
};

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
  <View style={styles.header}>{children}</View>
);

const DialogContent = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.content}>{children}</View>
);

const DialogFooter = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.footer}>{children}</View>
);

const DialogTitle = ({ children }: { children: React.ReactNode }) => (
  <Text style={styles.title}>{children}</Text>
);

const DialogDescription = ({ children }: { children: React.ReactNode }) => (
  <Text style={styles.description}>{children}</Text>
);

const DialogClose = ({ onClose }: { onClose: () => void }) => (
  <IconButton icon="close" size={20} onPress={onClose} style={styles.closeButton} />
);

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
  },
  dialog: {
    width: "90%",
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  header: {
    marginBottom: 8,
  },
  content: {
    marginBottom: 12,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  closeButton: {
    position: "absolute",
    right: 4,
    top: 4,
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
