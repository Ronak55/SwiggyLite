import React, { useRef } from "react";
import { View, Animated, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { colors, spacing } from "../theme";

import Header from "../components/home/Header";
import SearchBar from "../components/home/SearchBar";
import VegToggle from "../components/home/VegToogle";
import BannerCarousel from "../components/home/BannerCarousel";
import CategoryList from "../components/home/CategoryList";
import WhatsOnYourMind from "../components/home/WhatsOnYourMind";
import FiltersBar from "../components/home/FilterBar";
import RestaurantList from "../components/home/RestaurantList";
import { mockData } from "../data/mockData";

export default function HomeScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;

  const restaurants = mockData.restaurants;

  return (
    <SafeAreaView style={{ padding: 20, flex: 1, backgroundColor: colors.gray100 }}>
      <Animated.FlatList
        data={restaurants}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        ListHeaderComponent={
          <>
            <Header />
            <SearchBar />
            <VegToggle />
            <BannerCarousel />
            <CategoryList />
            <WhatsOnYourMind />
            <FiltersBar />
          </>
        }
        stickyHeaderIndices={[5, 6]}
        renderItem={({ item }) => <RestaurantList restaurant={item} />}
        contentContainerStyle={{ paddingBottom: spacing.lg }}
      />
    </SafeAreaView>
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
