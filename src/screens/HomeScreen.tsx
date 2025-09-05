// src/screens/HomeScreen.tsx
import React, { useRef, useState } from "react";
import {
  View,
  Animated,
  StyleSheet,
} from "react-native";
import { colors, spacing } from "../theme";

import Header from "../components/home/Header";
import SearchBar from "../components/home/SearchBar";
import VegToggle from "../components/home/VegToogle";
import BannerCarousel from "../components/home/BannerCarousel";
import CategoryList from "../components/home/CategoryList";
import WhatsOnYourMind from "../components/home/WhatsOnYourMind";
import FiltersBar from "../components/home/FilterBar";
import RestaurantList from "../components/home/RestaurantList";


export default function HomeScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;

  const [whatsOnY, setWhatsOnY] = useState(0);
  const [filtersY, setFiltersY] = useState(0);
  const clampedScroll = Animated.diffClamp(scrollY, 0, Number.MAX_SAFE_INTEGER);

  const stickyWhatsOnTranslate = clampedScroll.interpolate({
    inputRange: [whatsOnY, filtersY],
    outputRange: [0, filtersY - whatsOnY],
    extrapolate: "clamp",
  });

  const stickyFiltersTranslate = clampedScroll.interpolate({
    inputRange: [filtersY, filtersY + 100],
    outputRange: [0, 100],
    extrapolate: "clamp",
  });

  return (
    <View style={{ flex: 1, backgroundColor: colors.gray100 }}>
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: spacing.lg }}
      >
        <Header />
        <SearchBar />
        <VegToggle />
        <BannerCarousel />
        <CategoryList />
        <View
          onLayout={(e) => setWhatsOnY(e.nativeEvent.layout.y)}
        >
          <WhatsOnYourMind />
        </View>
        <View
          onLayout={(e) => setFiltersY(e.nativeEvent.layout.y)}
        >
          <FiltersBar />
        </View>
        <RestaurantList />
      </Animated.ScrollView>
      {whatsOnY > 0 && (
        <Animated.View
          style={[
            styles.stickyWrapper,
            { transform: [{ translateY: stickyWhatsOnTranslate }] },
          ]}
        >
          <WhatsOnYourMind />
        </Animated.View>
      )}
      {filtersY > 0 && (
        <Animated.View
          style={[
            styles.stickyWrapper,
            { top: 0, transform: [{ translateY: stickyFiltersTranslate }] },
          ]}
        >
          <FiltersBar />
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  stickyWrapper: {
    position: "absolute",
    width: "100%",
    zIndex: 10,
    backgroundColor: colors.gray100,
  },
});
