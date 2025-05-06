import React, { useRef } from "react";
import { Text, TouchableOpacity, View, StyleSheet, ScrollView } from "react-native";
import { ChevronDown } from "lucide-react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type AccordionItemProps = {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  scrollRef: React.RefObject<ScrollView>;
  index: number;
};

const AccordionItem = ({
  title,
  children,
  isOpen,
  onToggle,
  scrollRef,
  index,
}: AccordionItemProps) => {
  const rotate = useSharedValue(0);

  const animatedChevron = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));

  React.useEffect(() => {
    rotate.value = withTiming(isOpen ? 180 : 0, { duration: 200 });

    if (isOpen && scrollRef.current) {
      scrollRef.current.scrollTo({
        y: index * 100, // Rough estimate of accordion height per item
        animated: true,
      });
    }
  }, [isOpen]);

  return (
    <View style={styles.accordionItem}>
      <TouchableOpacity onPress={onToggle} style={styles.accordionHeader}>
        <Text style={styles.title}>{title}</Text>
        <Animated.View style={animatedChevron}>
          <ChevronDown size={16} />
        </Animated.View>
      </TouchableOpacity>
      {isOpen && <View style={styles.accordionContent}>{children}</View>}
    </View>
  );
};

export const AccordionGroup = ({
  sections,
}: {
  sections: { title: string; content: React.ReactNode }[];
}) => {
  const [openIndices, setOpenIndices] = React.useState<number[]>([]);
  const scrollRef = useRef<ScrollView>(null);

  const toggleSection = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <ScrollView ref={scrollRef}>
      {sections.map((section, index) => (
        <AccordionItem
          key={index}
          title={section.title}
          isOpen={openIndices.includes(index)}
          onToggle={() => toggleSection(index)}
          scrollRef={scrollRef}
          index={index}
        >
          {section.content}
        </AccordionItem>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  accordionItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 8,
  },
  accordionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  accordionContent: {
    paddingHorizontal: 10,
    paddingBottom: 12,
  },
});
