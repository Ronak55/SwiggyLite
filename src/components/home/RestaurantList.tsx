import React, { useMemo, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, typography, spacing } from "../../theme";
import { mockData } from "../../data/mockData";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const CARD_HEIGHT = hp("15%");
const IMAGE_WIDTH = wp("30%");

export default function RestaurantList() {
  const restaurants = useMemo(
    () =>
      mockData.restaurants.map((r) => ({
        ...r,
        ratingCount: Math.floor(Math.random() * 1000) + 10,
      })),
    []
  );

  const renderItem = ({ item }: { item: typeof restaurants[0] }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const onPressIn = () => {
      Animated.spring(scaleAnim, {
        toValue: 0.97,
        useNativeDriver: true,
      }).start();
    };

    const onPressOut = () => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 100,
        useNativeDriver: true,
      }).start();
    };

    return (
      <TouchableWithoutFeedback onPressIn={onPressIn} onPressOut={onPressOut}>
        <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
          <Image
            source={{ uri: item.cover }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.content}>
            <View style={styles.topRow}>
              <Text style={styles.name} numberOfLines={1}>
                {item.name}
              </Text>
              <Ionicons name="ellipsis-vertical" size={18} color={colors.gray500} />
            </View>
            <Text style={styles.subInfo}>
              {item.rating} ({item.ratingCount}+) • {item.etaMins}-{item.etaMins + 5} mins
            </Text>
            <View style={styles.cuisinesRow}>
              {item.vegOnly && <View style={styles.vegDot} />}
              <Text style={styles.cuisines}>{item.cuisines.join(", ")}</Text>
            </View>
            {item.offer && (
              <View style={styles.offerBadge}>
                <Text style={styles.offerText}>{item.offer}</Text>
              </View>
            )}
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.totalText}>{restaurants.length} Restaurants to explore</Text>
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: spacing.lg }}
        initialNumToRender={6}
        maxToRenderPerBatch={8}
        windowSize={10}
        removeClippedSubviews={true}
        getItemLayout={(_, index) => ({
          length: CARD_HEIGHT + spacing.sm * 2,
          offset: (CARD_HEIGHT + spacing.sm * 2) * index,
          index,
        })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  totalText: {
    ...typography.h2,
    fontWeight: "600",
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
    color: colors.black,
  },
  card: {
    flexDirection: "row",
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
    shadowColor: colors.black,
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    height: CARD_HEIGHT,
  },
  image: {
    width: IMAGE_WIDTH,
    height: CARD_HEIGHT,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  content: {
    flex: 1,
    padding: spacing.sm,
    justifyContent: "space-between",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    ...typography.body,
    fontWeight: "600",
    color: colors.black,
  },
  subInfo: {
    ...typography.small,
    color: colors.gray700,
    marginTop: spacing.xs,
  },
  cuisinesRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.xs / 2,
  },
  vegDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success,
    marginRight: spacing.xs,
  },
  cuisines: {
    ...typography.small,
    color: colors.gray500,
  },
  offerBadge: {
    marginTop: spacing.xs,
    backgroundColor: "#FFF4E5",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 8,
    alignSelf: "flex-start",
    elevation: 1,
  },
  offerText: {
    ...typography.small,
    color: "#FF7A00",
    fontWeight: "600",
  },
});
