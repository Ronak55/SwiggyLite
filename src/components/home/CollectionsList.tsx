// src/components/CollectionsScroller.tsx
import React from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import { mockData } from "../../data/mockData";
import { colors, typography, spacing } from "../../theme";
import { device } from "../../utils";

const CARD_WIDTH = device.width * 0.38;
const CARD_HEIGHT = CARD_WIDTH * 1.25; 

export default function CollectionsList() {
  const renderItem = ({ item }: { item: (typeof mockData.collections)[0] }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.85}>
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.gradientOverlay} />
      <Text style={styles.title} numberOfLines={2}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Collections</Text>
      <FlatList
        data={mockData.collections}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        snapToInterval={CARD_WIDTH + spacing.md}
        decelerationRate="fast"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.lg,
  },
  heading: {
    ...typography.h2,
    fontSize: 18,
    fontWeight: "600",
    color: colors.black,
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  listContent: {
    paddingHorizontal: spacing.md,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginRight: spacing.md,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: colors.gray100,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  gradientOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: CARD_HEIGHT * 0.35,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  title: {
    position: "absolute",
    bottom: spacing.sm,
    left: spacing.sm,
    right: spacing.sm,
    color: colors.white,
    fontSize: 14,
    fontWeight: "700",
  },
});
