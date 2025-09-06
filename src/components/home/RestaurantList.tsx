import React, { useMemo, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { colors, typography, spacing } from "../../theme";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const CARD_HEIGHT = hp("18%");
const IMAGE_WIDTH = wp("32%");

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

  const etaRange = useMemo(() => {
    const start = Math.max(10, restaurant.etaMins - 10);
    const end = Math.max(start + 5, restaurant.etaMins);
    return `${start}-${end}`;
  }, [restaurant.etaMins]);

  const ratingCountK = useMemo(
    () => `${Math.floor(Math.random() * 40) + 10}K+`,
    []
  );

  return (
    <TouchableWithoutFeedback onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View
        style={[styles.card, { transform: [{ scale: scaleAnim }] }]}
      >
        <View style={styles.imageWrapper}>
          <Image
            source={restaurant.cover}
            style={styles.image}
            contentFit="cover"
            cachePolicy="memory-disk"
          />
          {restaurant.offer ? (
            <View style={styles.offerOverlay}>
              <Text style={styles.offerOverlayText} numberOfLines={2}>
                {restaurant.offer.toUpperCase()}
              </Text>
            </View>
          ) : null}
          <View style={styles.favButton}>
            <Ionicons name="heart-outline" size={14} color={colors.gray700} />
          </View>
        </View>

        <View style={styles.content}>
          <View>
            <View style={styles.badgeRow}>
              <Ionicons
                name={restaurant.promoted ? "trophy-outline" : "flash-outline"}
                size={14}
                color={restaurant.promoted ? colors.warning : colors.primary}
              />
              <Text style={styles.badgeText} numberOfLines={1}>
                {restaurant.promoted
                  ? `Best In ${restaurant.cuisines[0]}`
                  : `Food in ${etaRange} min`}
              </Text>
            </View>

            <View style={styles.topRow}>
              <Text style={styles.name} numberOfLines={1}>
                {restaurant.name}
              </Text>
              <Ionicons
                name="ellipsis-vertical"
                size={18}
                color={colors.gray500}
              />
            </View>
          </View>

          <View>
            <View style={styles.ratingRow}>
              <View style={styles.ratingPill}>
                <Ionicons name="star" size={10} color={colors.white} />
                <Text style={styles.ratingText}>{restaurant.rating}</Text>
              </View>
              <Text style={styles.subInfo}>
                {` (${ratingCountK}) • ${etaRange} mins`}
              </Text>
            </View>

            <View style={styles.cuisinesRow}>
              {restaurant.vegOnly && <View style={styles.vegDot} />}
              <Text style={styles.cuisines} numberOfLines={1}>
                {restaurant.cuisines.join(", ")}
              </Text>
            </View>

            <Text style={styles.locality} numberOfLines={1}>
              {`HSR Layout • ${restaurant.distanceKm} km`}
            </Text>
          </View>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginHorizontal: 0,
    marginVertical: spacing.sm,
    borderRadius: 12,
    overflow: "hidden",
    height: CARD_HEIGHT,
  },
imageWrapper: {
    width: IMAGE_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
    badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  badgeText: {
    ...typography.small,
    fontWeight: "600",
    marginLeft: spacing.xs,
    color: colors.gray900,
  },
  content: {
    flex: 1,
    padding: spacing.sm,
    justifyContent: "center",
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
    fontWeight: "600",
    marginTop: spacing.xs,
  },
  cuisinesRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.xs / 2,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.xs,
  },
  ratingPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.success,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 4,
  },
  ratingText: {
    ...typography.small,
    color: colors.white,
    marginLeft: 4,
    fontWeight: "600",
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
  locality: {
    ...typography.small,
    color: colors.gray700,
    marginTop: spacing.xs / 2,
  },
  offerOverlay: {
    position: "absolute",
    left: spacing.xs,
    bottom: spacing.xs,
    backgroundColor: "rgba(0,0,0,0.55)",
    paddingHorizontal: spacing.sm,
     paddingVertical: 4,
    borderRadius: 6,
    maxWidth: IMAGE_WIDTH - spacing.md,
  },
   offerOverlayText: {
    ...typography.small,
    color: colors.white,
    fontWeight: "700",
  },
  favButton: {
    position: "absolute",
    top: spacing.xs,
    right: spacing.xs,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: colors.black,
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
});
