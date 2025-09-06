import React, { useRef, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import { Image } from "expo-image";
import { mockData } from "../../data/mockData";
import { spacing, colors } from "../../theme";

const { width } = Dimensions.get("window");
const BANNER_HEIGHT = width * 0.45;

export default function BannerCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<any>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const indexRef = useRef(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (mockData.banners.length > 0) {
        indexRef.current = (indexRef.current + 1) % mockData.banners.length;
        flatListRef.current?.scrollToIndex({
          index: indexRef.current,
          animated: true,
        });
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleMomentumScrollEnd = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
    indexRef.current = index;
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={mockData.banners}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        decelerationRate="fast"
        snapToInterval={width}
        snapToAlignment="start"
        scrollEventThrottle={16}
        removeClippedSubviews
        style={{ width }}
        showsHorizontalScrollIndicator={false}
        getItemLayout={(_, index) => ({ length: width, offset: width * index, index })}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        renderItem={({ item }) => (
          <View style={styles.bannerWrapper}>
            <Image
              source={item.image}
              style={styles.bannerImage}
              contentFit="cover" 
              cachePolicy="disk"
            />
          </View>
        )}
      />
      <View style={styles.indicatorContainer}>
        {mockData.banners.map((_, i) => {
          const widthAnimated = scrollX.interpolate({
            inputRange: [
              (i - 1) * width,
              i * width,
              (i + 1) * width,
            ],
            outputRange: [8, 16, 8],
            extrapolate: "clamp",
          });

          const opacityAnimated = scrollX.interpolate({
            inputRange: [
              (i - 1) * width,
              i * width,
              (i + 1) * width,
            ],
            outputRange: [0.5, 1, 0.5],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={i}
              style={[
                styles.indicatorDot,
                {
                  width: widthAnimated,
                  opacity: opacityAnimated,
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.md,
    marginLeft: -spacing.screenHorizontal,
    marginRight: -spacing.screenHorizontal,
  },
  bannerWrapper: {
    width,
  },
  bannerImage: {
    width: "100%",
    height: BANNER_HEIGHT,
    backgroundColor: colors.gray100,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: spacing.sm,
  },
  indicatorDot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginHorizontal: 4,
  },
});
