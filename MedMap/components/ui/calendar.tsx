import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Text, useTheme, Surface, IconButton } from "react-native-paper";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from "date-fns";

export const Calendar: React.FC = () => {
  const theme = useTheme();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  return (
    <Surface style={styles.container}>
      <View style={styles.header}>
        <IconButton icon="chevron-left" onPress={handlePrevMonth} />
        <Text style={styles.monthText}>{format(currentDate, "MMMM yyyy")}</Text>
        <IconButton icon="chevron-right" onPress={handleNextMonth} />
      </View>

      <View style={styles.weekDays}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
          <Text key={day} style={styles.weekDayText}>
            {day}
          </Text>
        ))}
      </View>

      <FlatList
        data={days}
        numColumns={7}
        keyExtractor={(item) => item.toISOString()}
        renderItem={({ item }) => {
          const selected = selectedDate && isSameDay(item, selectedDate);
          const today = isToday(item);
          return (
            <TouchableOpacity
              onPress={() => setSelectedDate(item)}
              style={[
                styles.dayContainer,
                selected && { backgroundColor: theme.colors.primary },
                today && { borderColor: theme.colors.primary, borderWidth: 1 },
              ]}
            >
              <Text
                style={[
                  styles.dayText,
                  selected && { color: theme.colors.onPrimary },
                  today && !selected && { color: theme.colors.primary },
                ]}
              >
                {item.getDate()}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  monthText: {
    fontSize: 18,
    fontWeight: "600",
  },
  weekDays: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    marginBottom: 8,
  },
  weekDayText: {
    width: 32,
    textAlign: "center",
    fontWeight: "500",
    color: "#666",
  },
  dayContainer: {
    width: 40,
    height: 40,
    margin: 2,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  dayText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
