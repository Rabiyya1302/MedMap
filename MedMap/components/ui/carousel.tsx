import React, { useRef, useState } from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel"; // Import ICarouselInstance
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { IconButton } from "react-native-paper";
import { ArrowLeft, ArrowRight } from "lucide-react-native";
import { TCarouselProps } from "react-native-reanimated-carousel"; // Import the correct type for Carousel

interface RNCarouselProps<T> {
  data: T[];
  renderItem: ({ item, index }: { item: T; index: number }) => React.ReactElement;
  loop?: boolean;
  autoPlay?: boolean;
  width?: number;
  height?: number;
}

export function RNCarousel<T>({
  data,
  renderItem,
  loop = true,
  autoPlay = false,
  width,
  height = 200,
}: RNCarouselProps<T>) {
  const { width: windowWidth } = useWindowDimensions();
  const carouselWidth = width ?? windowWidth;
  const carouselRef = useRef<ICarouselInstance>(null); // Use ICarouselInstance for the ref type
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    carouselRef.current?.scrollTo({ count: 1, animated: true }); // scrollTo should be available on ICarouselInstance
  };

  const handlePrev = () => {
    carouselRef.current?.scrollTo({ count: -1, animated: true });
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        width={carouselWidth}
        height={height}
        data={data}
        loop={loop}
        autoPlay={autoPlay}
        onSnapToItem={setCurrentIndex}
        renderItem={renderItem}
        style={styles.carousel}
        customAnimation={React.useCallback((value: number) => {
          "worklet";
          return {
            transform: [{ scale: value }],
          };
        }, [])}
      />

      <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.navButtons}>
        <IconButton
          icon={() => <ArrowLeft size={18} />}
          size={24}
          mode="contained"
          onPress={handlePrev}
          style={styles.navButton}
        />
        <IconButton
          icon={() => <ArrowRight size={18} />}
          size={24}
          mode="contained"
          onPress={handleNext}
          style={styles.navButton}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  carousel: {
    borderRadius: 16,
  },
  navButtons: {
    position: "absolute",
    top: "50%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    zIndex: 10,
  },
  navButton: {
    backgroundColor: "#ffffffee",
  },
});
