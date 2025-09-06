import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { mockData } from "../../data/mockData";
import { Icons } from "../../utils/icons";
import { colors, typography, spacing } from "../../theme";

const CARD_WIDTH = 120;
const CARD_HEIGHT = 140;

export default function CategoryList() {
  const [likedItems, setLikedItems] = useState<Record<string, boolean>>({});

  const renderItem = ({ item }: any) => {
    const isLiked = likedItems[item.id] ?? false;

    return (
      <View style={styles.cardContainer}>
        {/* Image with Gradients */}
        <View style={styles.card}>
          <Image source={{ uri: item.image }} style={styles.image} />

          {/* Top Gradient for Heart */}
          <LinearGradient
            colors={["rgba(0,0,0,0.6)", "transparent"]}
            style={styles.topGradient}
          >
            <Pressable
              onPress={() =>
                setLikedItems((prev) => ({ ...prev, [item.id]: !isLiked }))
              }
              style={styles.heartButton}
            >
              <Icons.Ionicons
                name={isLiked ? "heart" : "heart-circle"}
                color={isLiked ? colors.primary : colors.white}
                size={20}
              />
            </Pressable>
          </LinearGradient>

          {/* Bottom Gradient */}
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.85)"]}
            style={styles.bottomGradient}
          />

          {/* Offer Badge */}
          {item.offer && <Text style={styles.offerText}>{item.offer} OFF</Text>}
        </View>

        {/* Restaurant Name */}
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>

        {/* Rating & Time */}
        <View style={styles.infoRow}>
          <View style={styles.ratingPill}>
            <Icons.Ionicons name="star" size={10} color={colors.white} />
          </View>
          <Text style={styles.infoText}>{item.rating}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.infoText}>{item.time} mins</Text>
        </View>

        {/* Cuisine */}
        <Text style={styles.cuisineText} numberOfLines={1}>
          {item.cuisines}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Quick Delivery</Text>
      <FlatList
        data={mockData.categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: spacing.md}}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.body,
    fontWeight: "600",
    marginVertical: spacing.sm,
  },
  cardContainer: {
    width: CARD_WIDTH,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: spacing.md,
    overflow: "hidden",
    marginBottom: spacing.sm,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  topGradient: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "30%",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    padding: spacing.xs,
  },
  bottomGradient: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "40%",
  },
  heartButton: {
    padding: spacing.xs,
  },
  offerText: {
    position: "absolute",
    bottom: spacing.sm,
    left: spacing.md,
    color: colors.white,
    fontSize: typography.medium.fontSize,
    fontWeight: "600",
  },
  name: {
    ...typography.medium,
    color: colors.gray900,
    marginBottom: spacing.xs / 2,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xs / 2,
  },
  ratingPill: {
    width: spacing.md,
    height: spacing.md,
    borderRadius: spacing.md / 2,
    backgroundColor: colors.success,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.xs / 2,
  },
  infoText: {
    ...typography.small,
    color: colors.gray700,
  },
  dot: {
    marginHorizontal: spacing.xs / 2,
    color: colors.gray700,
  },
  cuisineText: {
    ...typography.small,
    color: colors.gray500,
  },
});
