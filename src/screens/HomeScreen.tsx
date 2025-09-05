import React, { useMemo, useRef } from "react";
import { View, Animated, StyleSheet, SafeAreaView } from "react-native";
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

  type ListItem =
    | { type: "whats"; key: string }
    | { type: "filters"; key: string }
    | { type: "restaurant"; key: string; restaurant: (typeof restaurants)[number] };

  const listData: ListItem[] = useMemo(() => {
    const headerItems: ListItem[] = [
      { type: "whats", key: "whats" },
      { type: "filters", key: "filters" },
    ];
    const restaurantItems: ListItem[] = restaurants.map((r) => ({
      type: "restaurant",
      key: `rest-${r.id}`,
      restaurant: r,
    }));
    return [...headerItems, ...restaurantItems];
  }, [restaurants]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.gray100, paddingTop: spacing.lg}}>
      <Animated.FlatList
        data={listData}
        keyExtractor={(item) => item.key}
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
          </>
        }
        stickyHeaderIndices={[1, 2]}
        renderItem={({ item }) => {
          if (item.type === "whats") {
            return (
              <View style={{ backgroundColor: colors.gray100 }}>
                <WhatsOnYourMind />
              </View>
            );
          }
          if (item.type === "filters") {
            return (
              <View style={{ backgroundColor: colors.gray100 }}>
                <FiltersBar />
              </View>
            );
          }
          return <RestaurantList restaurant={item.restaurant} />;
        }}
        contentContainerStyle={{
          paddingBottom: spacing.lg,
          paddingHorizontal: spacing.screenHorizontal,
        }}
        initialNumToRender={8}
        windowSize={10}
        maxToRenderPerBatch={8}
        updateCellsBatchingPeriod={50}
        removeClippedSubviews
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
