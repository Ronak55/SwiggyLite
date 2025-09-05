import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, typography, spacing } from "../../theme";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const CARD_HEIGHT = hp("15%");
const IMAGE_WIDTH = wp("30%");

type RestaurantItemProps = {
  restaurant: {
    id: string;
    name: string;
    rating: string;
    vegOnly: boolean;
    etaMins: number;
    distanceKm: string;
    costForTwo: string;
    cover: string;
    cuisines: string[];
    offer: string;
    promoted: boolean;
  };
};

export default function RestaurantList({ restaurant }: RestaurantItemProps) {
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
          source={{ uri: restaurant.cover }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.content}>
          <View style={styles.topRow}>
            <Text style={styles.name} numberOfLines={1}>
              {restaurant.name}
            </Text>
            <Ionicons name="ellipsis-vertical" size={18} color={colors.gray500} />
          </View>
          <Text style={styles.subInfo}>
            {restaurant.rating} ({Math.floor(Math.random() * 1000) + 10}+) •{" "}
            {restaurant.etaMins}-{restaurant.etaMins + 5} mins
          </Text>
          <View style={styles.cuisinesRow}>
            {restaurant.vegOnly && <View style={styles.vegDot} />}
            <Text style={styles.cuisines}>{restaurant.cuisines.join(", ")}</Text>
          </View>
          {restaurant.offer && (
            <View style={styles.offerBadge}>
              <Text style={styles.offerText}>{restaurant.offer}</Text>
            </View>
          )}
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
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
