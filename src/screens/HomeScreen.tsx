import React, { useMemo, useRef, useState } from "react";
import { View, Animated, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing } from "../theme";

import Header from "../components/home/Header";
import SearchBar from "../components/home/SearchBar";
import VegToggle from "../components/home/VegToogle";
import BannerCarousel from "../components/home/BannerCarousel";
import CategoryList from "../components/home/CategoryList";
import FiltersBar from "../components/home/FilterBar";
import RestaurantList from "../components/home/RestaurantList";
import WhatsOnYourMind from "../components/home/WhatsOnYourMind";
import { mockData } from "../data/mockData";

export default function HomeScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<Animated.FlatList>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const restaurants = mockData.restaurants;

  type ListItem =
    | { type: "filters"; key: string }
    | { type: "restaurant"; key: string; restaurant: (typeof restaurants)[number] };

  const listData: ListItem[] = useMemo(() => {
    const items: ListItem[] = [
      { type: "filters", key: "filters" },
      ...restaurants.map((r) => ({ type: "restaurant" as const, key: `rest-${r.id}`, restaurant: r })),
    ];
    return items;
  }, [restaurants]);

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowScrollTop(offsetY > 300); 
  };

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={listData}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false, listener: handleScroll }
        )}
        ListHeaderComponent={
          <>
            <Header />
            <SearchBar />
            <VegToggle />
            <BannerCarousel />
            <CategoryList />
            <WhatsOnYourMind />
          </>
        }
        stickyHeaderIndices={[1]}
        renderItem={({ item }) => {
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
          paddingBottom: spacing.lg * 2,
          paddingHorizontal: spacing.screenHorizontal,
        }}
        initialNumToRender={8}
        windowSize={10}
        maxToRenderPerBatch={8}
        updateCellsBatchingPeriod={50}
        removeClippedSubviews
      />
      {showScrollTop && (
        <TouchableOpacity style={styles.scrollTopButton} activeOpacity={0.8} onPress={scrollToTop}>
          <Ionicons name="arrow-up" size={24} color={colors.white} />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.gray100, paddingTop: spacing.lg },

  scrollTopButton: {
    position: "absolute",
    bottom: spacing.lg,
    alignSelf: "center",
    backgroundColor: colors.primary,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: colors.black,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
  },
});
